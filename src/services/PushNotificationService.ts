// import messaging from '@react-native-firebase/messaging';
// import { Alert, AppState, DeviceEventEmitter, Linking, Platform } from 'react-native';

// import { navigateRef } from '../navigation/AppContainer';
// import { navigationPush } from '../utils/functions';
// import { requestNotificationPermission } from './PermissionService';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { asyncSetDeviceToken } from '../storage/asyncStorage';

// export async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   if (Platform.OS==='android') {
//     const permission = await requestNotificationPermission();
//   }

//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     getDeviceToken();
//   }
// }

// async function getDeviceToken() {
//   try {
//     console.log(".....");
    
//     let fcmToken = await messaging().getToken();
//     if (fcmToken) {
//       console.log("New token: ", fcmToken);
//       asyncSetDeviceToken(fcmToken);

//     }
//   } catch (error) {
//     console.log("Error while getting token = ", error);
//   }
// }

// export const subscribeToAll = async (topic: string) => {
//   try {
//     await messaging().subscribeToTopic(topic);
//     console.log('Subscribed to topic:', topic);
//   } catch (error) {
//     console.error('Error subscribing to topic:', error);
//   }
// };

// // export const getAppNotificationCount = async () => {
// //   let count = await asyncGetNotificationCount();
// //   return count ? count : '0'
// // }

// export const setAppNotificationCount = async (count: any) => {
//   console.log(count, '====', typeof (count));
//   if (count != null || count != undefined) {
//     // asyncSetNotificationCount(count);
//   }
// }

// export const notificationListener = () => {

//   messaging().onNotificationOpenedApp((remoteMessage: any) => {
//     console.log('when open app :', remoteMessage);
//     handleNotificationClick(remoteMessage);
//   });

//   messaging()
//     .getInitialNotification()
//     .then((remoteMessage: any) => {
//       if (remoteMessage) {
//         console.log('Quit!', remoteMessage);
//         setTimeout(() => {
//           handleNotificationClick(remoteMessage);
//         }, 4000)
//       }
//     });

//   messaging().onMessage(async (remoteMessage: any) => {
//     console.log("Foreground!", remoteMessage);
//   });

//   messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
//     console.log('Background!', remoteMessage);

//     setAppNotificationCount(Platform.OS == 'ios' ? (remoteMessage.notification?.ios?.badge ? JSON.parse(remoteMessage.notification?.ios?.badge.toString()) : '0') : (remoteMessage.data?.badge ? JSON.parse(remoteMessage.data?.badge) : '0'))
//   });
// }

// const handleNotificationClick = (remoteMessage: any) => {
//   try {
//     let value = JSON.parse(remoteMessage?.data?.value || "{}");
//     if (navigateRef.isReady() && remoteMessage?.data.hasOwnProperty('redirection_page') && remoteMessage.data?.redirection_page) {
//       setTimeout(() => {
//         navigationPush(remoteMessage.data?.redirection_page, { ...value });
//       }, 2000)
//     }
//   } catch (e: any) {
//     console.log('---navigation page error----', e)
//   }
// };
