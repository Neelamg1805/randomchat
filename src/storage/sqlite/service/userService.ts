import { getDBConnection } from '../index';
import { User } from '../model/chat';

export const createUser = (user: User): boolean => {
  try {
    const db = getDBConnection();
    const result = db.execute(
      `INSERT INTO users (id, name, gender, socket_id, is_online, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        user.id,
        user.name,
        user.gender,
        user.socket_id || null,
        user.is_online,
        user.created_at,
        user.updated_at,
      ]
    );
    return result.rowsAffected > 0;
  } catch (error) {
    console.error('Error creating user:', error);
    return false;
  }
};

export const getUserById = (userId: string): User | null => {
  try {
    const db = getDBConnection();
    const result = db.execute('SELECT * FROM users WHERE id = ?', [userId]);
    
    if (result.rows.length > 0) {
      return result.rows.item(0) as User;
    }
    return null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export const updateUserSocketId = (userId: string, socketId: string): boolean => {
  try {
    const db = getDBConnection();
    const timestamp = Date.now();
    const result = db.execute(
      'UPDATE users SET socket_id = ?, is_online = 1, updated_at = ? WHERE id = ?',
      [socketId, timestamp, userId]
    );
    return result.rowsAffected > 0;
  } catch (error) {
    console.error('Error updating user socket:', error);
    return false;
  }
};

export const setUserOffline = (userId: string): boolean => {
  try {
    const db = getDBConnection();
    const timestamp = Date.now();
    const result = db.execute(
      'UPDATE users SET is_online = 0, updated_at = ? WHERE id = ?',
      [timestamp, userId]
    );
    return result.rowsAffected > 0;
  } catch (error) {
    console.error('Error setting user offline:', error);
    return false;
  }
};

export const updateUser = (user: Partial<User> & { id: string }): boolean => {
  try {
    const db = getDBConnection();
    const timestamp = Date.now();
    const result = db.execute(
      'UPDATE users SET name = ?, gender = ?, updated_at = ? WHERE id = ?',
      [user.name, user.gender, timestamp, user.id]
    );
    return result.rowsAffected > 0;
  } catch (error) {
    console.error('Error updating user:', error);
    return false;
  }
};

