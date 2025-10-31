import io, { Socket } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createChat, getChatById } from '../storage/sqlite/service/chatService';
import { saveMessage } from '../storage/sqlite/service/chatService';
import { Chat, Message } from '../storage/sqlite/model/chat';

// Update this with your Socket.io server URL
// For Android Emulator: http://10.0.2.2:3000
// For iOS Simulator: http://localhost:3000
// For Physical Device: http://YOUR_COMPUTER_IP:3000 (e.g., http://192.168.1.100:3000)
const SOCKET_URL = 'http://localhost:3000'; // ⚠️ CHANGE THIS TO YOUR SERVER URL

class ChatMatchingService {
  private socket: Socket | null = null;
  private userId: string | null = null;
  private currentChatId: string | null = null;
  private onMessageReceivedCallback: ((message: Message) => void) | null = null;
  private onMatchFoundCallback: ((chat: Chat) => void) | null = null;
  private onDisconnectedCallback: (() => void) | null = null;

  async initialize(userId: string, userName: string, userGender: string) {
    try {
      // Get or create socket connection
      if (!this.socket) {
        this.socket = io(SOCKET_URL, {
          transports: ['websocket'],
          reconnection: true,
          reconnectionDelay: 1000,
        });

        this.setupSocketListeners();
      }

      this.userId = userId;

      // Emit user info to server
      this.socket.emit('user:register', {
        userId,
        userName,
        userGender,
      });

      // Save user info to AsyncStorage
      await AsyncStorage.setItem('currentUser', JSON.stringify({
        id: userId,
        name: userName,
        gender: userGender,
      }));

      return true;
    } catch (error) {
      console.error('Error initializing chat service:', error);
      return false;
    }
  }

  private setupSocketListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Connected to chat server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from chat server');
      if (this.onDisconnectedCallback) {
        this.onDisconnectedCallback();
      }
    });

    this.socket.on('match:found', async (data: { chatId: string; matchedUser: any }) => {
      console.log('Match found:', data);
      
      // Create chat in local database
      const chat: Chat = {
        id: data.chatId,
        user1_id: this.userId!,
        user2_id: data.matchedUser.id,
        user1_name: (await this.getCurrentUser())?.name || 'You',
        user2_name: data.matchedUser.name,
        created_at: Date.now(),
        is_active: 1,
      };

      createChat(chat);
      this.currentChatId = data.chatId;

      if (this.onMatchFoundCallback) {
        this.onMatchFoundCallback(chat);
      }
    });

    this.socket.on('message:received', async (data: { message: string; senderId: string; timestamp: number }) => {
      console.log('Message received:', data);
      
      if (!this.currentChatId || !this.userId) return;

      const message: Message = {
        id: `${Date.now()}-${Math.random()}`,
        chat_id: this.currentChatId,
        sender_id: data.senderId,
        receiver_id: this.userId,
        message: data.message,
        created_at: data.timestamp,
        is_read: 0,
      };

      // Save message to SQLite
      saveMessage(message);

      if (this.onMessageReceivedCallback) {
        this.onMessageReceivedCallback(message);
      }
    });

    this.socket.on('match:error', (error: string) => {
      console.error('Match error:', error);
    });
  }

  async startMatching() {
    if (!this.socket || !this.userId) {
      console.error('Socket not initialized');
      return false;
    }

    this.socket.emit('match:start');
    return true;
  }

  async stopMatching() {
    if (!this.socket) return;
    this.socket.emit('match:stop');
  }

  async sendMessage(messageText: string) {
    if (!this.socket || !this.currentChatId || !this.userId) {
      console.error('Cannot send message: not connected or no active chat');
      return false;
    }

    const message: Message = {
      id: `${Date.now()}-${Math.random()}`,
      chat_id: this.currentChatId,
      sender_id: this.userId,
      receiver_id: '', // Will be set by server
      message: messageText,
      created_at: Date.now(),
      is_read: 0,
    };

    // Save message to SQLite immediately
    saveMessage(message);

    // Send to server
    this.socket.emit('message:send', {
      chatId: this.currentChatId,
      message: messageText,
    });

    return true;
  }

  setCurrentChatId(chatId: string) {
    this.currentChatId = chatId;
  }

  onMessageReceived(callback: (message: Message) => void) {
    this.onMessageReceivedCallback = callback;
  }

  onMatchFound(callback: (chat: Chat) => void) {
    this.onMatchFoundCallback = callback;
  }

  onDisconnected(callback: () => void) {
    this.onDisconnectedCallback = callback;
  }

  async getCurrentUser() {
    try {
      const userStr = await AsyncStorage.getItem('currentUser');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.userId = null;
    this.currentChatId = null;
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export default new ChatMatchingService();

