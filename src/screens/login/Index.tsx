import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import colors from '../../utils/colors';
type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation }: Props) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);

  const handleSubmit = () => {
    if (!name || !gender) {
      // alert('Please enter your name and select gender');
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Drawer' }, { name: 'Chat' }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.gradientBackground}>
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Login</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor={colors.PURPLE_TEXT_LIGHT}
                style={styles.textInput}
              />
            </View>

            <Text style={styles.genderLabel}>Select Gender:</Text>

            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[styles.genderOption, gender === 'male' && styles.genderOptionSelected]}
                onPress={() => setGender('male')}
              >
                <View style={[styles.genderIcon, { backgroundColor: colors.PURPLE_LIGHT }]}>
                  <Text style={styles.genderIconText}>👨</Text>
                </View>
                <Text style={[styles.genderText, gender === 'male' && styles.genderTextSelected]}>Male</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.genderOption, gender === 'female' && styles.genderOptionSelected]}
                onPress={() => setGender('female')}
              >
                <View style={[styles.genderIcon, { backgroundColor: colors.PURPLE_ACCENT }]}>
                  <Text style={styles.genderIconText}>👩</Text>
                </View>
                <Text style={[styles.genderText, gender === 'female' && styles.genderTextSelected]}>Female</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.continueButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>CONTINUE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    backgroundColor: colors.PURPLE_BACKGROUND,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.PURPLE_TEXT,
    textAlign: 'left',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 30,
  },
  textInput: {
    backgroundColor: colors.PURPLE_INPUT_BG,
    borderWidth: 1,
    borderColor: colors.PURPLE_BORDER,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.PURPLE_TEXT,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  genderLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.PURPLE_TEXT,
    marginBottom: 20,
    textAlign: 'center',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  genderOption: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 16,
    minWidth: 100,
  },
  genderOptionSelected: {
    backgroundColor: colors.PURPLE_ACCENT_LIGHT,
    borderWidth: 2,
    borderColor: colors.PURPLE_PRIMARY,
  },
  genderIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  genderIconText: {
    fontSize: 40,
  },
  genderText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.PURPLE_TEXT_LIGHT,
  },
  genderTextSelected: {
    color: colors.PURPLE_PRIMARY,
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 20,
  },
  continueButton: {
    backgroundColor: colors.PURPLE_PRIMARY,
    borderRadius: 12,
    paddingVertical: 16,
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
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default Login;
