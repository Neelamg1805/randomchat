import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import colors from '../../utils/colors';
import Header from '../../components/header/Index';
import SafeAreaViewWrapper from '../../components/safeAreaViewWrapper/Index';
import styles from './Style';
import ChatMatchingService from '../../services/ChatMatchingService';
import { 
  getMessagesByChatId, 
  saveMessage, 
  getChatById,
  markMessagesAsRead,
} from '../../storage/sqlite/service/chatService';
import { initializeDatabase } from '../../storage/sqlite/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Message, Chat as ChatType } from '../../storage/sqlite/model/chat';

interface MessageDisplay {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chat = ({ navigation, route }: any) => {
  const [messages, setMessages] = useState<MessageDisplay[]>([]);
  const [inputText, setInputText] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentChat, setCurrentChat] = useState<ChatType | null>(null);
  const [otherUserName, setOtherUserName] = useState('Stranger');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const chatIdFromRoute = route?.params?.chatId;

  useEffect(() => {
    initializeChat();
    return () => {
      ChatMatchingService.disconnect();
    };
  }, []);


  useEffect(() => {
    if (chatIdFromRoute && currentUserId) {
      loadChatMessages(chatIdFromRoute);
      ChatMatchingService.setCurrentChatId(chatIdFromRoute);
    }
  }, [chatIdFromRoute, currentUserId]);

  const initializeChat = async () => {
    try {
      // Initialize database
      initializeDatabase();

      // Get current user
      const userStr = await AsyncStorage.getItem('currentUser');
      if (!userStr) {
        Alert.alert('Error', 'User not found. Please login again.');
        navigation.navigate('Login');
        return;
      }

      const currentUser = JSON.parse(userStr);
      setCurrentUserId(currentUser.id);

      // Initialize chat matching service
      const initialized = await ChatMatchingService.initialize(
        currentUser.id,
        currentUser.name,
        currentUser.gender
      );

      if (!initialized) {
        Alert.alert('Error', 'Failed to initialize chat service');
        return;
      }

      setIsConnected(ChatMatchingService.isConnected());

      // Setup event listeners
      ChatMatchingService.onMessageReceived((message: Message) => {
        addMessageToDisplay(message);
        scrollToBottom();
      });

      ChatMatchingService.onMatchFound((chat: ChatType) => {
        setCurrentChat(chat);
        setOtherUserName(chat.user2_name);
        loadChatMessages(chat.id);
        Alert.alert('Match Found!', `You are now chatting with ${chat.user2_name}`);
      });

      ChatMatchingService.onDisconnected(() => {
        setIsConnected(false);
        Alert.alert('Disconnected', 'Connection lost. Trying to reconnect...');
      });

      // Load chat if chatId provided
      if (chatIdFromRoute) {
        const chat = getChatById(chatIdFromRoute);
        if (chat) {
          setCurrentChat(chat);
          setOtherUserName(currentUser.id === chat.user1_id ? chat.user2_name : chat.user1_name);
        }
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error initializing chat:', error);
      Alert.alert('Error', 'Failed to initialize chat');
      setIsLoading(false);
    }
  };

  const loadChatMessages = async (chatId: string) => {
    try {
      const dbMessages = getMessagesByChatId(chatId);
      
      if (!currentUserId) return;

      const userStr = await AsyncStorage.getItem('currentUser');
      if (!userStr) return;

      const currentUser = JSON.parse(userStr);
      
      const displayMessages: MessageDisplay[] = dbMessages.map((msg: Message) => ({
        id: msg.id,
        text: msg.message,
        isUser: msg.sender_id === currentUser.id,
        timestamp: new Date(msg.created_at),
      }));

      setMessages(displayMessages);
      scrollToBottom();

      // Mark messages as read
      markMessagesAsRead(chatId, currentUser.id);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const addMessageToDisplay = (message: Message) => {
    if (!currentUserId) return;

    const displayMessage: MessageDisplay = {
      id: message.id,
      text: message.message,
      isUser: message.sender_id === currentUserId,
      timestamp: new Date(message.created_at),
    };

    setMessages(prev => [...prev, displayMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !currentChat) {
      return;
    }

    if (!ChatMatchingService.isConnected()) {
      Alert.alert('Error', 'Not connected to chat server');
      return;
    }

    const messageText = inputText.trim();
    setInputText('');

    // Send message via Socket.io
    const sent = await ChatMatchingService.sendMessage(messageText);

    if (!sent) {
      Alert.alert('Error', 'Failed to send message');
      setInputText(messageText);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderMessage = (message: MessageDisplay) => {
    return (
      <View key={message.id} style={styles.messageContainer}>
        <View
          style={[
            styles.messageBubble,
            message.isUser ? styles.userMessageBubble : styles.otherMessageBubble,
          ]}>
          {message.isUser ? (
            <Text style={styles.userMessageText}>{message.text}</Text>
          ) : (
            <Text style={styles.otherMessageText}>{message.text}</Text>
          )}
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaViewWrapper>
        <Header navigation={navigation} title="Chat" type="menu" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.PURPLE_PRIMARY} />
          <Text style={{ marginTop: 10, color: colors.PURPLE_TEXT }}>Loading chat...</Text>
        </View>
      </SafeAreaViewWrapper>
    );
  }

  if (!currentChat) {
    return (
      <SafeAreaViewWrapper>
        <Header navigation={navigation} title="Chat" type="menu" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 18, color: colors.PURPLE_TEXT, textAlign: 'center' }}>
            No active chat. Go to Home and click "Start Chat" to find someone to chat with!
          </Text>
        </View>
      </SafeAreaViewWrapper>
    );
  }

  return (
    <SafeAreaViewWrapper>
      <Header navigation={navigation} title={otherUserName} type="menu" />
      <ScrollView
        ref={scrollViewRef}
        style={styles.chatContainer}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={scrollToBottom}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Today</Text>
        </View>

        {messages.map(renderMessage)}

        <View style={styles.spacer} />
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type Message"
          placeholderTextColor={colors.PURPLE_TEXT_LIGHT}
          multiline
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>✈</Text>
        </TouchableOpacity>
      </View>

      {!isConnected && (
        <View style={{ padding: 10, backgroundColor: colors.RED, alignItems: 'center' }}>
          <Text style={{ color: colors.WHITE }}>Disconnected - Trying to reconnect...</Text>
        </View>
      )}
    </SafeAreaViewWrapper>
  );
};

export default Chat;
