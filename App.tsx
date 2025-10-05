import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text } from 'react-native';
import Splash from './src/screens/splash/Index';
import Login from './src/screens/login/Index';
import Home from './src/screens/home/Index';
import Chat from './src/screens/chat/Index';
import colors from './src/utils/colors';
import Icon, { Icons } from './src/components/icons/Index';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Drawer: undefined;
};

export type DrawerParamList = {
  Home: undefined;
  Chat: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Chat"
      screenOptions={{
        drawerType: 'front',
        swipeEnabled: true,
        headerShown: false,
        drawerStyle: {
          backgroundColor: colors.PURPLE_BACKGROUND,
          width: '70%',
        },
        drawerPosition: 'left',
        drawerActiveBackgroundColor: colors.PURPLE_PRIMARY,
        drawerActiveTintColor: colors.WHITE,
        drawerInactiveBackgroundColor: 'transparent',
        drawerInactiveTintColor: colors.PURPLE_TEXT,
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '600',
          marginLeft: -10,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerLabel: ' Home',
          drawerIcon: ({ color, size }) => (
            <Icon type={Icons.Feather} name={"home"} size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Chat"
        component={Chat}
        options={{
          drawerLabel: ' Chat',
          drawerIcon: ({ color, size }) => (
            <Icon type={Icons.Feather} name={"message-circle"} size={size} color={color} />
          ),
        }}
      />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
