import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import Header from '../../components/header/Index';
import SafeAreaViewWrapper from '../../components/safeAreaViewWrapper/Index';
import colors from '../../utils/colors';
import ChatMatchingService from '../../services/ChatMatchingService';
import { initializeDatabase } from '../../storage/sqlite/index';
import { getChatsByUserId } from '../../storage/sqlite/service/chatService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Chat } from '../../storage/sqlite/model/chat';

function Index({ navigation }: any) {
  const [isMatching, setIsMatching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [recentChats, setRecentChats] = useState<Chat[]>([]);
  const [hasActiveChat, setHasActiveChat] = useState(false);

  useEffect(() => {
    initializeHome();
  }, []);

  const initializeHome = async () => {
    try {
      // Initialize database
      initializeDatabase();

      // Get current user
      const userStr = await AsyncStorage.getItem('currentUser');
      if (!userStr) {
        navigation.navigate('Login');
        return;
      }

      const user = JSON.parse(userStr);
      setCurrentUser(user);

      // Initialize chat matching service
      await ChatMatchingService.initialize(user.id, user.name, user.gender);

      // Load recent chats
      loadRecentChats(user.id);

      // Setup match found listener
      ChatMatchingService.onMatchFound((chat: Chat) => {
        setIsMatching(false);
        setHasActiveChat(true);
        navigation.navigate('Chat', { chatId: chat.id });
        Alert.alert('Match Found!', `You are now chatting with ${chat.user2_name}`);
      });

      setIsLoading(false);
    } catch (error) {
      console.error('Error initializing home:', error);
      setIsLoading(false);
    }
  };

  const loadRecentChats = (userId: string) => {
    try {
      const chats = getChatsByUserId(userId);
      setRecentChats(chats);
      setHasActiveChat(chats.length > 0);
    } catch (error) {
      console.error('Error loading recent chats:', error);
    }
  };

  const handleStartChat = async () => {
    if (!ChatMatchingService.isConnected()) {
      Alert.alert('Error', 'Not connected to chat server. Please check your connection.');
      return;
    }

    setIsMatching(true);
    const started = await ChatMatchingService.startMatching();

    if (!started) {
      setIsMatching(false);
      Alert.alert('Error', 'Failed to start matching. Please try again.');
      return;
    }

    // Show matching message
    Alert.alert('Finding Match...', 'Looking for someone to chat with. Please wait...', [
      {
        text: 'Cancel',
        onPress: async () => {
          await ChatMatchingService.stopMatching();
          setIsMatching(false);
        },
      },
    ]);
  };

  const handleContinueChat = (chatId: string) => {
    navigation.navigate('Chat', { chatId });
  };

  if (isLoading) {
    return (
      <SafeAreaViewWrapper>
        <Header navigation={navigation} type="menu" title="Home" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.PURPLE_PRIMARY} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaViewWrapper>
    );
  }

  return (
    <SafeAreaViewWrapper>
      <Header navigation={navigation} type="menu" title="Home" />
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.welcomeText}>Welcome, {currentUser?.name || 'User'}!</Text>
          <Text style={styles.descriptionText}>
            Connect with random people and start chatting
          </Text>

          <TouchableOpacity
            style={[styles.startChatButton, isMatching && styles.startChatButtonDisabled]}
            onPress={handleStartChat}
            disabled={isMatching}>
            {isMatching ? (
              <View style={styles.matchingContainer}>
                <ActivityIndicator size="small" color={colors.WHITE} style={{ marginRight: 10 }} />
                <Text style={styles.startChatButtonText}>Finding Match...</Text>
              </View>
            ) : (
              <Text style={styles.startChatButtonText}>Start Chat</Text>
            )}
          </TouchableOpacity>

          {recentChats.length > 0 && (
            <View style={styles.recentChatsContainer}>
              <Text style={styles.recentChatsTitle}>Recent Chats</Text>
              {recentChats.slice(0, 3).map((chat) => (
                <TouchableOpacity
                  key={chat.id}
                  style={styles.chatItem}
                  onPress={() => handleContinueChat(chat.id)}>
                  <View style={styles.chatAvatar}>
                    <Text style={styles.chatAvatarText}>
                      {currentUser?.id === chat.user1_id
                        ? chat.user2_name.charAt(0).toUpperCase()
                        : chat.user1_name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.chatInfo}>
                    <Text style={styles.chatName}>
                      {currentUser?.id === chat.user1_id ? chat.user2_name : chat.user1_name}
                    </Text>
                    <Text style={styles.chatTime}>
                      {chat.last_message_at
                        ? new Date(chat.last_message_at).toLocaleDateString()
                        : new Date(chat.created_at).toLocaleDateString()}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
    </SafeAreaViewWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PURPLE_BACKGROUND,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: colors.PURPLE_TEXT,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.PURPLE_TEXT,
    textAlign: 'center',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: colors.PURPLE_TEXT_LIGHT,
    textAlign: 'center',
    marginBottom: 40,
  },
  startChatButton: {
    backgroundColor: colors.PURPLE_PRIMARY,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginBottom: 30,
  },
  startChatButtonDisabled: {
    opacity: 0.7,
  },
  startChatButtonText: {
    color: colors.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  matchingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentChatsContainer: {
    marginTop: 20,
  },
  recentChatsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.PURPLE_TEXT,
    marginBottom: 15,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.PURPLE_PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  chatAvatarText: {
    color: colors.WHITE,
    fontSize: 20,
    fontWeight: 'bold',
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.PURPLE_TEXT,
    marginBottom: 4,
  },
  chatTime: {
    fontSize: 12,
    color: colors.PURPLE_TEXT_LIGHT,
  },
});

export default Index;
