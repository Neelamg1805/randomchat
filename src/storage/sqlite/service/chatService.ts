import { getDBConnection } from '../index';
import { Chat, Message } from '../model/chat';

export const createChat = (chat: Chat): boolean => {
  try {
    const db = getDBConnection();
    const result = db.execute(
      `INSERT INTO chats (id, user1_id, user2_id, user1_name, user2_name, created_at, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        chat.id,
        chat.user1_id,
        chat.user2_id,
        chat.user1_name,
        chat.user2_name,
        chat.created_at,
        chat.is_active,
      ]
    );
    return result.rowsAffected > 0;
  } catch (error) {
    console.error('Error creating chat:', error);
    return false;
  }
};

export const getChatById = (chatId: string): Chat | null => {
  try {
    const db = getDBConnection();
    const result = db.execute('SELECT * FROM chats WHERE id = ?', [chatId]);
    
    if (result.rows.length > 0) {
      return result.rows.item(0) as Chat;
    }
    return null;
  } catch (error) {
    console.error('Error getting chat:', error);
    return null;
  }
};

export const getChatsByUserId = (userId: string): Chat[] => {
  try {
    const db = getDBConnection();
    const result = db.execute(
      `SELECT * FROM chats 
       WHERE (user1_id = ? OR user2_id = ?) AND is_active = 1
       ORDER BY last_message_at DESC, created_at DESC`,
      [userId, userId]
    );
    
    const chats: Chat[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      chats.push(result.rows.item(i) as Chat);
    }
    return chats;
  } catch (error) {
    console.error('Error getting chats:', error);
    return [];
  }
};

export const updateChatLastMessage = (chatId: string, timestamp: number): boolean => {
  try {
    const db = getDBConnection();
    const result = db.execute(
      'UPDATE chats SET last_message_at = ? WHERE id = ?',
      [timestamp, chatId]
    );
    return result.rowsAffected > 0;
  } catch (error) {
    console.error('Error updating chat:', error);
    return false;
  }
};

export const saveMessage = (message: Message): boolean => {
  try {
    const db = getDBConnection();
    const result = db.execute(
      `INSERT INTO messages (id, chat_id, sender_id, receiver_id, message, created_at, is_read)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        message.id,
        message.chat_id,
        message.sender_id,
        message.receiver_id,
        message.message,
        message.created_at,
        message.is_read,
      ]
    );
    
    if (result.rowsAffected > 0) {
      // Update chat's last message timestamp
      updateChatLastMessage(message.chat_id, message.created_at);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error saving message:', error);
    return false;
  }
};

export const getMessagesByChatId = (chatId: string): Message[] => {
  try {
    const db = getDBConnection();
    const result = db.execute(
      'SELECT * FROM messages WHERE chat_id = ? ORDER BY created_at ASC',
      [chatId]
    );
    
    const messages: Message[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      messages.push(result.rows.item(i) as Message);
    }
    return messages;
  } catch (error) {
    console.error('Error getting messages:', error);
    return [];
  }
};

export const markMessagesAsRead = (chatId: string, userId: string): boolean => {
  try {
    const db = getDBConnection();
    const result = db.execute(
      'UPDATE messages SET is_read = 1 WHERE chat_id = ? AND receiver_id = ? AND is_read = 0',
      [chatId, userId]
    );
    return result.rowsAffected > 0;
  } catch (error) {
    console.error('Error marking messages as read:', error);
    return false;
  }
};

export const deleteChat = (chatId: string): boolean => {
  try {
    const db = getDBConnection();
    const result = db.execute('UPDATE chats SET is_active = 0 WHERE id = ?', [chatId]);
    return result.rowsAffected > 0;
  } catch (error) {
    console.error('Error deleting chat:', error);
    return false;
  }
};

