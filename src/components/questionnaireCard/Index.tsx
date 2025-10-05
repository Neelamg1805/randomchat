import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import colors from '../../utils/colors';

interface QuestionnaireCardProps {
  onComplete: () => void;
}

const QuestionnaireCard: React.FC<QuestionnaireCardProps> = ({ onComplete }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.profileContainer}>
          <View style={styles.profileImage}>
            <Text style={styles.profileEmoji}>👩</Text>
          </View>
        </View>
        <Text style={styles.title}>Questionnaire</Text>
        <Text style={styles.description}>
          I've attached a series of questions to help us get to know you.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.answerButton} onPress={onComplete}>
            <Text style={styles.answerButtonText}>Answer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.remindButton}>
            <Text style={styles.remindButtonText}>🔔 Remind Me</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.PURPLE_PRIMARY,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileEmoji: {
    fontSize: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.WHITE,
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: colors.WHITE,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  answerButton: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    flex: 1,
    marginRight: 10,
  },
  answerButtonText: {
    color: colors.PURPLE_PRIMARY,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  remindButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  remindButtonText: {
    color: colors.WHITE,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default QuestionnaireCard;
