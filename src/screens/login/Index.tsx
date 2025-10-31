import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Animated,KeyboardAvoidingView,Platform,ScrollView,Image} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import colors from '../../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUser } from '../../storage/sqlite/service/userService';
import { initializeDatabase } from '../../storage/sqlite/index';
import { LinearGradient } from 'react-native-linear-gradient';
import { LOGO } from '../../utils/images';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation }: Props) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSubmit = async () => {
    if (!name.trim()) {
      return;
    }
    if (!gender) {
      return;
    }

    try {
      const userId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      initializeDatabase();

      await AsyncStorage.setItem(
        'currentUser',
        JSON.stringify({
          id: userId,
          name: name.trim(),
          gender: gender,
        })
      );

      createUser({
        id: userId,
        name: name.trim(),
        gender: gender,
        is_online: 0,
        created_at: Date.now(),
        updated_at: Date.now(),
      });

      navigation.reset({
        index: 0,
        routes: [{ name: 'Drawer' }],
      });
    } catch (error) {
      console.error('Error saving user:', error);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Drawer' }],
      });
    }
  };

  const isFormValid = name.trim().length > 0 && gender !== null;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <LinearGradient
        colors={[colors.PURPLE_PRIMARY, colors.PURPLE_DARK, colors.PURPLE_LIGHT]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
            <View style={styles.headerContainer}>
                  <Image source={LOGO} style={styles.logo} />
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Your Name</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your name"
                    placeholderTextColor={colors.PURPLE_TEXT_LIGHT}
                    style={styles.textInput}
                    autoCapitalize="words"
                    maxLength={30}
                  />
                </View>
              </View>
              <View style={styles.genderWrapper}>
                <Text style={styles.genderLabel}>I am</Text>
                <View style={styles.genderContainer}>
                  <TouchableOpacity
                    style={[
                      styles.genderOption,
                      gender === 'male' && styles.genderOptionSelected,
                    ]}
                    onPress={() => setGender('male')}
                    activeOpacity={0.7}>
                    <LinearGradient
                      colors={
                        gender === 'male'
                          ? [colors.PURPLE_PRIMARY, colors.PURPLE_LIGHT]
                          : [colors.WHITE, colors.PURPLE_INPUT_BG]
                      }
                      style={styles.genderIconContainer}>
                      <Text style={styles.genderIconText}>👨</Text>
                    </LinearGradient>
                    <Text
                      style={[
                        styles.genderText,
                        gender === 'male' && styles.genderTextSelected,
                      ]}>
                      Male
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.genderOption,
                      gender === 'female' && styles.genderOptionSelected,
                    ]}
                    onPress={() => setGender('female')}
                    activeOpacity={0.7}>
                    <LinearGradient
                      colors={
                        gender === 'female'
                          ? [colors.PURPLE_ACCENT, '#F472B6']
                          : [colors.WHITE, colors.PURPLE_INPUT_BG]
                      }
                      style={styles.genderIconContainer}>
                      <Text style={styles.genderIconText}>👩</Text>
                    </LinearGradient>
                    <Text
                      style={[
                        styles.genderText,
                        gender === 'female' && styles.genderTextSelected,
                      ]}>
                      Female
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.continueButton,
                  !isFormValid && styles.continueButtonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={!isFormValid}
                activeOpacity={0.8}>
                <LinearGradient
                  colors={
                    isFormValid
                      ? [colors.PURPLE_PRIMARY, colors.PURPLE_LIGHT]
                      : [colors.PURPLE_TEXT_LIGHT, colors.PURPLE_TEXT_LIGHT]
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}>
                  <Text style={styles.buttonText}>
                    {isFormValid ? 'Continue ✨' : 'Enter Details'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <Text style={styles.footerText}>
                By continuing, you agree to start chatting with random people
              </Text>
            </View>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logo: {
    width: 100,
    height: 100,
  },
  welcomeText: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
    fontWeight: '500',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.WHITE,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 8,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  inputWrapper: {
    marginBottom: 32,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.WHITE,
    marginBottom: 12,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: colors.PURPLE_TEXT,
    paddingVertical: 14,
  },
  genderWrapper: {
    marginBottom: 20,
  },
  genderLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.WHITE,
    marginBottom: 16,
    textAlign: 'center',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  genderOption: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    minWidth: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  genderOptionSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  genderIconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  genderIconText: {
    fontSize: 45,
  },
  genderText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  genderTextSelected: {
    color: colors.WHITE,
    fontWeight: 'bold',
    fontSize: 17,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  continueButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    marginBottom: 16,
  },
  continueButtonDisabled: {
    opacity: 0.6,
  },
  buttonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default Login;
