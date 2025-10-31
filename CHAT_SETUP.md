# Random Chat Feature Setup Guide

## Overview
This app implements a random chat feature using:
- **SQLite** for local message storage
- **Socket.io** for real-time chat matching and messaging
- **React Native** for mobile app

## Features Implemented
✅ User registration and storage in SQLite  
✅ Random matching with other users via Socket.io  
✅ Real-time chat messaging  
✅ Message storage in SQLite  
✅ Chat history management  
✅ Connection status monitoring  

## Socket.io Server Setup

You need to run a Socket.io server for the matching and real-time chat to work. Here's a simple server setup:

### 1. Install Socket.io Server
```bash
npm install socket.io express cors
```

### 2. Create Server File (server.js)
```javascript
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Store users waiting for match
const waitingUsers = [];

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Register user
  socket.on('user:register', (userData) => {
    socket.userId = userData.userId;
    socket.userName = userData.userName;
    socket.userGender = userData.userGender;
    console.log('User registered:', socket.userId);
  });

  // Start matching
  socket.on('match:start', () => {
    console.log('User looking for match:', socket.userId);
    
    // Find a match
    const match = waitingUsers.find(user => user.id !== socket.userId);
    
    if (match) {
      // Remove matched user from waiting list
      const matchIndex = waitingUsers.findIndex(u => u.id === match.id);
      waitingUsers.splice(matchIndex, 1);
      
      // Create chat ID
      const chatId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Notify both users
      socket.emit('match:found', {
        chatId,
        matchedUser: {
          id: match.id,
          name: match.name,
          gender: match.gender,
        }
      });
      
      io.to(match.socketId).emit('match:found', {
        chatId,
        matchedUser: {
          id: socket.userId,
          name: socket.userName,
          gender: socket.userGender,
        }
      });
      
      console.log('Match created:', chatId);
    } else {
      // Add to waiting list
      waitingUsers.push({
        id: socket.userId,
        name: socket.userName,
        gender: socket.userGender,
        socketId: socket.id,
      });
    }
  });

  // Stop matching
  socket.on('match:stop', () => {
    const index = waitingUsers.findIndex(u => u.id === socket.userId);
    if (index > -1) {
      waitingUsers.splice(index, 1);
    }
  });

  // Send message
  socket.on('message:send', (data) => {
    // Broadcast message to other user in the chat
    // In production, you should store chat pairs and find the other user
    socket.broadcast.emit('message:received', {
      message: data.message,
      senderId: socket.userId,
      timestamp: Date.now(),
      chatId: data.chatId,
    });
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.userId);
    const index = waitingUsers.findIndex(u => u.id === socket.userId);
    if (index > -1) {
      waitingUsers.splice(index, 1);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
});
```

### 3. Update Socket URL in App
Update `src/services/ChatMatchingService.ts`:
```typescript
const SOCKET_URL = 'http://YOUR_SERVER_IP:3000'; // Change this to your server URL
// For Android emulator: http://10.0.2.2:3000
// For iOS simulator: http://localhost:3000
// For physical device: http://YOUR_COMPUTER_IP:3000
```

### 4. Run Server
```bash
node server.js
```

## App Configuration

1. **Update Socket URL**: 
   - Edit `src/services/ChatMatchingService.ts`
   - Change `SOCKET_URL` to your server's IP address

2. **For Android Emulator**: Use `http://10.0.2.2:3000`
3. **For iOS Simulator**: Use `http://localhost:3000`
4. **For Physical Device**: Use your computer's local IP (e.g., `http://192.168.1.100:3000`)

## Database Structure

### Users Table
- id (TEXT PRIMARY KEY)
- name (TEXT)
- gender (TEXT)
- socket_id (TEXT)
- is_online (INTEGER)
- created_at (INTEGER)
- updated_at (INTEGER)

### Chats Table
- id (TEXT PRIMARY KEY)
- user1_id (TEXT)
- user2_id (TEXT)
- user1_name (TEXT)
- user2_name (TEXT)
- created_at (INTEGER)
- last_message_at (INTEGER)
- is_active (INTEGER)

### Messages Table
- id (TEXT PRIMARY KEY)
- chat_id (TEXT)
- sender_id (TEXT)
- receiver_id (TEXT)
- message (TEXT)
- created_at (INTEGER)
- is_read (INTEGER)

## Usage Flow

1. **User Login**: User enters name and gender, data saved to SQLite
2. **Start Chat**: User clicks "Start Chat" button, joins matching queue
3. **Match Found**: Server matches two users, creates chat ID
4. **Chat Screen**: Both users redirected to chat screen with chat ID
5. **Send Messages**: Messages sent via Socket.io and saved to SQLite
6. **Chat History**: Messages loaded from SQLite when opening chat

## Notes

- The Socket.io server needs to be running for matching and real-time messaging
- Messages are stored locally in SQLite for offline access
- Chat history persists even after app restart
- Users are matched randomly from the waiting queue

