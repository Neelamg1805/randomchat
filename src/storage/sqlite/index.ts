import { open } from 'react-native-quick-sqlite';
import {
  CREATE_TABLE_CHATS,
  CREATE_TABLE_MESSAGES,
  CREATE_TABLE_USERS,
} from './model/chat';

let db: any = null;

export const getDBConnection = () => {
  if (!db) {
    db = open({ name: 'randomchat.db', location: 'default' });
    initializeDatabase();
  }
  return db;
};

export const initializeDatabase = () => {
  try {
    const database = getDBConnection();
    
    // Create tables
    database.execute(CREATE_TABLE_USERS);
    database.execute(CREATE_TABLE_CHATS);
    database.execute(CREATE_TABLE_MESSAGES);
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export const closeDatabase = () => {
  if (db) {
    db.close();
    db = null;
  }
};
