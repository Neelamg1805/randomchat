import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import Style from './Style';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash = ({ navigation }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={Style.container}>
      {/* <Image source={LOGO} style={Style.logo} />
       */}
      <Text >Random Chat Pro</Text>
      <Text >Connect with random people around the world!</Text>
    </View>
  );
};

export default Splash;
