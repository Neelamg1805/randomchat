// import Geolocation from '@react-native-community/geolocation';
// import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';

// export async function requestCameraPermission() {
//     if (Platform.OS === 'ios') {
//         return true;
//     }
//     try {
//         const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.CAMERA, {
//             title: 'Permission',
//             message: 'Allow MYIB to take pictures and record video.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: "Don't allow",
//             buttonPositive: 'Allow',
//         },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             console.log('You can use the camera');
//             return true;
//         } else {
//             console.log('Permission denied');
//             return false;
//         }
//     } catch (err) {
//         console.warn(err);
//         return false;
//     }
// }

// export async function requestAudioPermission() {
//     if (Platform.OS === 'ios') {
//         return true;
//     }
//     try {
//         const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
//             title: 'Permission',
//             message: 'Allow MYIB to record audio.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: "Don't allow",
//             buttonPositive: 'Allow',
//         },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             console.log('You can use the RECORD_AUDIO');
//             return true;
//         } else {
//             console.log('Permission denied');
//             return false;
//         }
//     } catch (err) {
//         console.warn(err);
//         return false;
//     }
// }

// export async function requestStoragePermission() {
//     if (Platform.OS === 'ios') {
//         return true;
//     }
//     try {
//         const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES, {
//             title: 'Permission',
//             message: 'Allow MYIB to select pictures and video.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: "Don't allow",
//             buttonPositive: 'Allow',
//         },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             console.log('You can use the storage');
//             return true;
//         } else {
//             console.log('Permission denied');
//             return false;
//         }
//     } catch (err) {
//         console.warn(err);
//         return false;
//     }
// }

// export async function requestNotificationPermission() {
//     if (Platform.OS === 'ios') {
//         return true;
//     }
//     try {
//         const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS, {
//             title: 'Permission',
//             message: 'Allow MYIB for notifications.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: "Don't allow",
//             buttonPositive: 'Allow',
//         },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             console.log('Notification permission allow');
//             return true;
//         } else {
//             console.log('Notification permission denied');
//             return false;
//         }
//     } catch (err) {
//         console.warn(err);
//         return false;
//     }
// }


// export async function requestFineLocationPermission(): Promise<boolean> {
//     if (Platform.OS === 'ios') {
//         return true;
//     }
//     try {
//         const granted = await PermissionsAndroid.requestMultiple([
//             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//             PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
//         ]);

//         const fineLocationStatus = granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION];

//         if (fineLocationStatus === PermissionsAndroid.RESULTS.GRANTED) {
//             console.log('Foreground location permission granted.');

//             const gpsEnabled = await new Promise<boolean>((resolve) => {
//                 Geolocation.getCurrentPosition(
//                     () => resolve(true),
//                     (error) => {
//                         console.log('GPS check error:', error);
//                         if (error.code === 2) {
//                             resolve(false);
//                         } else {
//                             resolve(true);
//                         }
//                     },
//                     { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 }
//                 );
//             });

//             if (!gpsEnabled) {
//                 Alert.alert(
//                     'Enable GPS',
//                     'Your GPS is turned off. Please enable it to continue'
//                 );
//                 return false;
//             }

//             return true;
//         }

//         if (fineLocationStatus === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
//             Alert.alert(
//                 'Permission Required',
//                 'Location permission has been permanently denied. Please enable it manually in settings.',
//                 [
//                     { text: 'Cancel', style: 'cancel' },
//                     { text: 'Open Settings', onPress: () => Linking.openSettings() },
//                 ]
//             );
//         } else {
//             console.log('Foreground location permission denied.');
//         }

//         return false;
//     } catch (err) {
//         console.warn('Error requesting location permission:', err);
//         return false;
//     }
// }

// export async function requestBackgroundLocationPermission() {
//     if (Platform.OS === 'ios') {
//         return true;
//     }
//     try {
//         const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION, {
//             title: 'Permission',
//             message: 'Allow MYIB for notifications.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: "Don't allow",
//             buttonPositive: 'Allow',
//         },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             console.log('background location permission allow');
//             return true;
//         } else {
//             console.log('background location permission denied');
//             return false;
//         }
//     } catch (err) {
//         console.warn(err);
//         return false;
//     }
// }

// export async function requestExternalStoragePermission() {
//     if (Platform.OS === 'ios') {
//         return true;
//     }
//     try {
//         const permissions: any = [];

//         if (Platform.Version >= '33') {
//             permissions.push(
//                 PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
//                 PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO
//             );
//         } else if (Platform.Version == '30' || '31') {
//             return true;
//         } else {
//             permissions.push(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
//             permissions.push(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
//         }

//         const granted = await PermissionsAndroid.requestMultiple(permissions);

//         const allGranted = Object.values(granted).every(
//             status => status === PermissionsAndroid.RESULTS.GRANTED
//         );

//         if (allGranted) {
//             console.log("All required permissions granted.");
//             return true;
//         } else {
//             console.error("Permissions denied:", granted);
//             return false;
//         }
//     } catch (e) {
//         console.log(e);
//         return false;
//     }
// }

// export const requestExternalStoragePermissionForDownload = async () => {
//     if (Platform.OS === 'ios') {
//         return true;
//     }
//     try {
//         const permissions: any = [];

//         if (Platform.Version >= '33') {
//             permissions.push(
//                 PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
//                 PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
//                 PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
//             );
//         } else {
//             permissions.push(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
//             permissions.push(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
//         }

//         const granted = await PermissionsAndroid.requestMultiple(permissions);

//         const allGranted = Object.values(granted).every(
//             status => status === PermissionsAndroid.RESULTS.GRANTED
//         );

//         if (allGranted) {
//             console.log("All required permissions granted.");
//             return true;
//         } else {
//             console.error("Permissions denied:", granted);
//             return false;
//         }
//     } catch (e) {
//         console.log(e);
//         return false;
//     }
// };