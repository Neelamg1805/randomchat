export const TABLE_CHATS = 'chats';
export const TABLE_MESSAGES = 'messages';
export const TABLE_USERS = 'users';

export const CREATE_TABLE_CHATS = `
  CREATE TABLE IF NOT EXISTS ${TABLE_CHATS} (
    id TEXT PRIMARY KEY,
    user1_id TEXT NOT NULL,
    user2_id TEXT NOT NULL,
    user1_name TEXT NOT NULL,
    user2_name TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    last_message_at INTEGER,
    is_active INTEGER DEFAULT 1
  )
`;

export const CREATE_TABLE_MESSAGES = `
  CREATE TABLE IF NOT EXISTS ${TABLE_MESSAGES} (
    id TEXT PRIMARY KEY,
    chat_id TEXT NOT NULL,
    sender_id TEXT NOT NULL,
    receiver_id TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    is_read INTEGER DEFAULT 0,
    FOREIGN KEY (chat_id) REFERENCES ${TABLE_CHATS}(id)
  )
`;

export const CREATE_TABLE_USERS = `
  CREATE TABLE IF NOT EXISTS ${TABLE_USERS} (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    gender TEXT NOT NULL,
    socket_id TEXT,
    is_online INTEGER DEFAULT 0,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  )
`;

export interface Chat {
  id: string;
  user1_id: string;
  user2_id: string;
  user1_name: string;
  user2_name: string;
  created_at: number;
  last_message_at?: number;
  is_active: number;
}

export interface Message {
  id: string;
  chat_id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  created_at: number;
  is_read: number;
}

export interface User {
  id: string;
  name: string;
  gender: string;
  socket_id?: string;
  is_online: number;
  created_at: number;
  updated_at: number;
}

