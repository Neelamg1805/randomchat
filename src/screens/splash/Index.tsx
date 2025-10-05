import { View, Image } from 'react-native';
import React, { useEffect } from 'react';
import Style from './Style';
import { LOGO } from '../../utils/images';
const Splash = ({ navigation }: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={Style.container}>
      <Image source={LOGO} style={Style.logo} />
    </View>
  );
};

export default Splash;
