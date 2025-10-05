import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import Splash from './src/screens/splash/Index';
import Login from './src/screens/login/Index';
import Home from './src/screens/home/Index';
import Chat from './src/screens/chat/Index';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Chat: undefined;
  Home: undefined;
  Drawer: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerType: 'front',
        swipeEnabled: true,
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#fff',
          width: '70%',
        },
        drawerPosition: 'left',
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Chat" component={Chat} />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
