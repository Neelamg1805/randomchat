import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  AppState
} from 'react-native';
import colors from '../../utils/colors';
import QuestionnaireCard from '../../components/questionnaireCard/Index';
import AttachmentMenu from '../../components/attachmentMenu/Index';
import Header from '../../components/header/Index';
import SafeAreaViewWrapper from '../../components/safeAreaViewWrapper/Index';
import styles from './Style';
import { checkForUpdates } from '../../utils/functions';
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'questionnaire' | 'completed';
}

const Chat = ({ navigation }: any) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi Michael! Thank you for your interest in our program. Would you mind filling out this brief questionnaire?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const checkUpdates = async () => {
      const needsUpdate: any = await checkForUpdates();
      if (!needsUpdate) {
        setIsUpdating(false);
      } else {
        setIsUpdating(true);
      }
    };

    const appStateListener = AppState.addEventListener('change', async (state) => {
      if (state === 'active') {
        await checkUpdates();
      }
    });

    return () => {
      appStateListener.remove();
    };
  }, []);
  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        isUser: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
    }
  };

  const handleQuestionnaireComplete = () => {
    setQuestionnaireCompleted(true);
    const completedMessage: Message = {
      id: Date.now().toString(),
      text: "Completed!",
      isUser: true,
      timestamp: new Date(),
      type: 'completed',
    };
    setMessages(prev => [...prev, completedMessage]);
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Great, thank you! The next step is to send a 60-second video of what your goals are going into the program.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };

  const renderMessage = (message: Message) => {
    if (message.type === 'completed') {
      return (
        <View key={message.id} style={styles.messageContainer}>
          <View style={styles.userMessageBubble}>
            <Text style={styles.userMessageText}>✓ {message.text}</Text>
          </View>
        </View>
      );
    }
    return (
      <View key={message.id} style={styles.messageContainer}>
        <View style={[
          styles.messageBubble,
          message.isUser ? styles.userMessageBubble : styles.otherMessageBubble
        ]}>
          {message.isUser ? (
            <View style={styles.userMessageBubble}>
              <Text style={styles.userMessageText}>{message.text}</Text>
            </View>
          ) : (
            <Text style={styles.otherMessageText}>{message.text}</Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaViewWrapper>
      <Header navigation={navigation} title="Amy Smith" type="menu" />
      <ScrollView style={styles.chatContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Today</Text>
        </View>

        {messages.map(renderMessage)}

        {!questionnaireCompleted && (
          <QuestionnaireCard onComplete={handleQuestionnaireComplete} />
        )}

        <View style={styles.spacer} />
      </ScrollView>

      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.attachmentButton}
          onPress={() => setShowAttachmentMenu(!showAttachmentMenu)}
        >
          <Text style={styles.attachmentButtonText}>+</Text>
        </TouchableOpacity>

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

      {showAttachmentMenu && (
        <AttachmentMenu onClose={() => setShowAttachmentMenu(false)} />
      )}
    </SafeAreaViewWrapper>
  );
};



export default Chat;
