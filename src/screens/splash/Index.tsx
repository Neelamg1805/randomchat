import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import Style from './Style';
import { asyncGetAuth, asyncGetUser } from '../../storage/asyncStorage';
import { useAppDispatch } from '../../store/hooks';
import { addUser } from '../../store/slices/user';
import { setAuth } from '../../store/slices/authentication';

const Splash = (props: any) => {
  const { navigation } = props;
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      let user = await asyncGetUser();
      let authorization = await asyncGetAuth();

      setTimeout(() => {
        if (authorization && user) {
          dispatch(addUser(user));
          dispatch(setAuth(authorization));

          if (!user.todayAttendance?.inTime) {
            navigation.navigate('Login');
          } else {
            navigation.navigate('Drawer');
          }
        } else {
          navigation.navigate('Login');
        }
      }, 3000)
    })()
  }, []);

  return (
    <View style={Style.container}>
      <Image source={require('../../../assets/images/logo.png')} style={Style.logo} />
    </View>
  );
};

export default Splash;
