import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import colors from '../../utils/colors';
import QuestionnaireCard from '../../components/questionnaireCard/Index';
import AttachmentMenu from '../../components/attachmentMenu/Index';
import Header from '../../components/header/Index';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;
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
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PURPLE_BACKGROUND,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.PURPLE_PRIMARY,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonText: {
    fontSize: 20,
    color: colors.WHITE,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.WHITE,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dateContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  dateText: {
    fontSize: 14,
    color: colors.PURPLE_TEXT_LIGHT,
    fontWeight: '500',
  },
  messageContainer: {
    marginVertical: 4,
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userMessageBubble: {
    alignSelf: 'flex-end',
    marginLeft: '20%',
    backgroundColor: colors.PURPLE_PRIMARY,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  otherMessageBubble: {
    alignSelf: 'flex-start',
    backgroundColor: colors.PURPLE_CARD_BG,
    marginRight: '20%',
  },
  userMessageText: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: '500',
  },
  otherMessageText: {
    color: colors.PURPLE_TEXT,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.WHITE,
    borderTopWidth: 1,
    borderTopColor: colors.PURPLE_BORDER,
  },
  attachmentButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.PURPLE_PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  attachmentButtonText: {
    color: colors.WHITE,
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.PURPLE_INPUT_BG,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.PURPLE_TEXT,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.PURPLE_PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  sendButtonText: {
    color: colors.WHITE,
    fontSize: 16,
  },
  spacer: {
    height: 20,
  },
});

export default Chat;
