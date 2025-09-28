// import { Alert, Clipboard, ToastAndroid, Linking, Platform, Share, PermissionsAndroid } from 'react-native';
// import { useNetInfo } from "@react-native-community/netinfo";
// import { addUser, deleteUser } from '../store/slices/user';
// import store, { } from '../store/Index';
// import { removeAuth, setAuth } from '../store/slices/authentication';
// import moment from 'moment';
// import FileViewer from 'react-native-file-viewer'
// import { setOutTime } from "../store/slices/user"
// import { navigateRef } from '../navigation/AppContainer';
// import { showMsg } from './showMsg';
// import { asyncLogout } from '../storage/asyncStorage';
// import Geolocation from '@react-native-community/geolocation';
// import { attandanceOut } from '../lib/attendance/Index';
// import { requestFineLocationPermission } from '../services/PermissionService';
// import RNFetchBlob from 'rn-fetch-blob';
// import { requestExternalStoragePermission, requestExternalStoragePermissionForDownload } from '../services/PermissionService';
// import colors from './colors';


// const dispatch = store.dispatch;
// const reduxState = store.getState();


// export function forceLogout() {
//   dispatch(deleteUser());
//   dispatch(removeAuth());
//   asyncLogout();
// }

// export function logout() {
//   Alert.alert('Logout', 'Are you sure you want to logout?', [
//     {
//       text: 'Cancel',
//       style: 'cancel',
//     },
//     {
//       text: 'OK',
//       onPress: () => {
//         forceLogout()
//       }
//     },
//   ]);
// }

// export function networkCheck() {
//   const { type, isConnected } = useNetInfo();
//   return Boolean(isConnected);
//   if (!Boolean(isConnected)) {
//     navigationPush("NoInterNet", {})
//     showMsg({ title: "No Internet!", description: 'Please check your network connection!', type: "WARNING" });
//   }
// }

// // navigationPush('NoInternet',{ })
// export const navigationPush = (screenName: string, value: any = {}) => {
//   if (navigateRef.isReady()) {
//     navigateRef.navigate(screenName, value);
//   }
// }

// export const copyToClipboard = (link: any) => {
//   Clipboard.setString(link || '')
//   ToastAndroid.show('Text copied to clipboard', ToastAndroid.SHORT)
// }

// export const openSettings = () => {
//   Alert.alert(
//     'Permission',
//     'Please grant permission to access the storage or gallery.',
//     [
//       {
//         text: 'OK', onPress: () => {
//           if (Platform.OS === 'ios') {
//             Linking.openURL('app-settings:');
//           } else {
//             Linking.openSettings();
//           }
//         }
//       },
//     ]
//   );
// };

// export const formattedDate = (dateString: any) => {
//   return moment(dateString).fromNow();
// };

// export async function getLocation() {
//   const hasPermission: any = await requestFineLocationPermission();
//   if (!hasPermission) {
//     return null;
//   }
//   const options = Platform.OS == 'android' && Platform.Version < 12 ?
//     {
//       enableHighAccuracy: true,
//       timeout: 15000,
//       maximumAge: 0,
//     } : {
//       enableHighAccuracy: false,
//       timeout: 7000,
//       maximumAge: 30000
//     }

//   let attempts = 0;
//   const maxRetries = 3;

//   while (attempts < maxRetries) {
//     try {
//       const position: any = await new Promise((resolve, reject) => {
//         Geolocation.getCurrentPosition(
//           (pos) => resolve(pos),
//           (error) => reject(error),
//           options
//         );
//       });

//       if (position) {
//         const latitude = position?.coords?.latitude ?? 0;
//         const longitude = position?.coords?.longitude ?? 0;
//         return { latitude, longitude };
//       }
//     } catch (error) {
//       attempts += 1;

//       if (attempts >= maxRetries) {
//         showMsg({
//           title: "Location Error",
//           description: "Please enable your location services and try again.",
//           // description: "Unable to get your location after multiple attempts. Please try again.",
//           type: 'WARNING',
//         });
//         return null;
//       }
//     }
//   }
// }

// export function forceAttendanceOut(user: any) {
//   return async () => {
//     try {
//       const { latitude, longitude }: any = await getLocation();
//       if (latitude && longitude) {
//         const response: any = await attandanceOut(user?.EmployeeId, user?.todayAttendance?.attendanceId, latitude, longitude);
//         console.log("Attendance Out Response:", response);
//         const attendanceOutTime: any = response?.attendance?.AttendanceOutTime;
//         if (attendanceOutTime) {
//           dispatch(setOutTime({ outtime: attendanceOutTime, id: response?.attendance?.id }));
//         }
//       } else {
//         console.error("Location not available");
//         showMsg({ title: "Error", description: "Something went wrong, please try again", type: 'FAILED' });
//       }
//     } catch (error) {
//       console.error("Error during attendance out:", error);
//       showMsg({ title: "Error", description: "Something went wrong, please try again", type: 'FAILED' });
//     }
//   };
// }

// export function attendanceOut(user: any) {
//   Alert.alert(
//     'Attendance Out',
//     'Are you sure you want to mark yourself as "Attendance Out".',
//     [
//       { text: 'CANCEL', style: 'cancel' },
//       {
//         text: 'CONFIRM',
//         onPress: forceAttendanceOut(user),
//       },
//     ]
//   );
// }

// export function getFileNameFromUrl(url: string) {
//   const parts = url.split('/');
//   return parts.pop() || null
// }


// export const openFile = async (filePath: string, isUrl: Boolean) => {
//   try {
//     const { dirs } = RNFetchBlob.fs;
//     const dirToSave = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
//     let fileName = await getFileNameFromUrl(filePath);
//     let newPath = `${dirToSave}/${fileName}`

//     await FileViewer.open(isUrl ? newPath : filePath, {
//       showOpenWithDialog: true
//     });
//   } catch (error) {
//     console.error('Error opening file:', error);
//   }
// };

// const download = async (url: string) => {
//   const { fs, ios } = RNFetchBlob;
//   const { dirs } = fs;
//   const dirToSave = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;

//   const fileName = await getFileNameFromUrl(url);
//   const filePath = `${dirToSave}/${Date.now()}_${fileName}`;

//   if (Platform.OS === 'ios') {
//     RNFetchBlob.config({
//       path: filePath,
//       fileCache: true,
//     })
//       .fetch('GET', url)
//       .then(async (res) => {
//         ios.previewDocument(res.path());

//         Alert.alert('Success', 'File downloaded');
//       })
//       .catch((err) => {
//         console.log('iOS download error:', err);
//         Alert.alert('Error', 'Failed to download file');
//       });
//   } else {
//     RNFetchBlob.config({
//       addAndroidDownloads: {
//         useDownloadManager: true,
//         notification: true,
//         mediaScannable: true,
//         title: fileName || 'file',
//         path: filePath,
//       },
//     })
//       .fetch('GET', url)
//       .then(() => {
//         ToastAndroid.show('File downloaded', ToastAndroid.SHORT);
//       })
//       .catch((err) => {
//         console.log('Android download error:', err);
//         ToastAndroid.show('Download failed', ToastAndroid.SHORT);
//       });
//   }
// }


// export const mediaDownload = async (url: string) => {
//   if (url) {
//     try {
//       if (Platform.OS === 'android') {
//         await requestExternalStoragePermission();
//         download(url)
//       } else {
//         download(url);
//       }
//     } catch (error: any) {
//       console.log('error while download', error)
//       ToastAndroid.show('Failed to download', ToastAndroid.SHORT)
//     }
//   } else {
//     console.log('no media to download');

//   }
// }


// export const downloadBlobFile = async (response: any) => {
//   try {
//     if (Platform.OS === 'android') {
//       let permission = await requestExternalStoragePermissionForDownload();
//       if (!permission) {
//         Alert.alert('Allow permission', 'Allow photos and media download', [
//           {
//             text: 'Cancel',
//           },
//           {
//             text: 'Open Settings',
//             onPress: () => {
//               Linking.openSettings();
//             },
//           },
//         ]);
//         return;
//       }
//     }

//     const fileBlob = response?.fileBlob;
//     const contentDisposition = response?.contentDisposition;
//     const filenameMatch = contentDisposition?.match(/filename="?(.+)"?/);
//     const filename = filenameMatch && filenameMatch.length > 0 ? filenameMatch[1] : 'report.xlsx';

//     if (!fileBlob) {
//       throw new Error('File blob missing');
//     }

//     const base64Data = await new Promise<string>((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64data = reader.result as string;
//         const base64 = base64data.split(',')[1];
//         resolve(base64);
//       };
//       reader.onerror = reject;
//       reader.readAsDataURL(fileBlob);
//     });

//     const { dirs } = RNFetchBlob.fs;
//     const saveDir = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
//     const filePath = `${saveDir}/${filename}`;

//     await RNFetchBlob.fs.writeFile(filePath, base64Data, 'base64');

//     if (Platform.OS === 'android') {
//       ToastAndroid.show(`File downloaded: ${filename}`, ToastAndroid.SHORT);
//     } else {
//       Alert.alert('Download complete', `File saved at: ${filePath}`);
//     }
//   } catch (error: any) {
//     console.error('Download error:', error);
//     Alert.alert('Download failed', error.message || 'Unknown error');
//   }
// };

// export function decodePolyline(encoded: any) {
//   let points = [];
//   let index = 0, len = encoded.length;
//   let lat = 0, lng = 0;

//   while (index < len) {
//     let b, shift = 0, result = 0;

//     do {
//       b = encoded.charCodeAt(index++) - 63;
//       result |= (b & 0x1f) << shift;
//       shift += 5;
//     } while (b >= 0x20);
//     let dlat = (result & 1) ? ~(result >> 1) : (result >> 1);
//     lat += dlat;

//     shift = 0;
//     result = 0;

//     do {
//       b = encoded.charCodeAt(index++) - 63;
//       result |= (b & 0x1f) << shift;
//       shift += 5;
//     } while (b >= 0x20);
//     let dlng = (result & 1) ? ~(result >> 1) : (result >> 1);
//     lng += dlng;

//     points.push({
//       latitude: lat / 1e5,
//       longitude: lng / 1e5
//     });
//   }

//   return points;
// }

// // ******* Rate us *********
// // export const rateUs = () => {
// //   if (RATE_APP_URL) {
// //     Linking.openURL(RATE_APP_URL);
// //   } else {
// //     console.error('Rate app URL is not defined in the environment variables.');
// //   }
// // };

// // ******* share app *******
// // export const shareApp = () => {
// //   if (SHARE_APP_URL) {
// //     Share.share({
// //       message: SHARE_APP_URL,
// //     })
// //       .then((result) => { })
// //       .catch((errorMsg) => console.log(errorMsg));
// //   } else {
// //     console.error('Share app URL is not defined in the environment variables.');
// //   }
// // };

// // export const checkForUpdates = async (): Promise<boolean> => {
// //   if (Platform.OS === 'android') {
// //     const inAppUpdates = new SpInAppUpdates(false);
// //     const result = await inAppUpdates.checkNeedsUpdate();
// //     if (result.shouldUpdate) {
// //       let updateOptions: StartUpdateOptions = {
// //         updateType: IAUUpdateKind.IMMEDIATE,
// //       };
// //       await inAppUpdates.startUpdate(updateOptions);
// //       return true;
// //     }
// //     return false;
// //   } else if (Platform.OS === 'ios') {
// //     Alert.alert(
// //       'Update Available',
// //       `There is a new version of the app available on the App Store.`,
// //       [
// //         {
// //           text: 'UPDATE NOW',
// //           onPress: () => {
// //             console.log("Update process initiated for iOS");
// //           },
// //         },
// //       ]
// //     );
// //     return true;
// //   }
// //   return false;
// // };

// type FileField = {
//   uri: string;
//   type: string;
//   name: string;
// };

// type JsonValue = string | number | boolean | null | undefined | FileField;

// type JsonData = {
//   [key: string]: JsonValue;
// };

// export function convertJsonToFormData(json: JsonData): FormData {
//   const formData = new FormData();

//   Object.entries(json).forEach(([key, value]) => {
//     if (
//       value &&
//       typeof value === 'object' &&
//       'uri' in value &&
//       'type' in value &&
//       'name' in value
//     ) {
//       formData.append(key, {
//         uri: value.uri,
//         type: value.type,
//         name: value.name,
//       } as any);
//     } else {
//       formData.append(key, value ?? '');
//     }
//   });

//   return formData;
// }


// export const dateformat = (date: any) => {
//   if (!date) return
//   return new Date(date).toLocaleDateString('en-GB', {
//     day: '2-digit',
//     month: 'short',
//     year: 'numeric',
//   })
// }

// export const countByKeyValue = (regions: any[], key: string) => {
//   const counts: Record<string, number> = {};

//   regions.length && regions.forEach(region => {
//     if (Array.isArray(region.bdms)) {
//       region.bdms.forEach((bdm: any) => {
//         if (Array.isArray(bdm.actions)) {
//           bdm.actions.forEach((action: any) => {
//             let value = action[key];

//             if (key === 'completion_status' && (value === null || value === undefined)) {
//               value = 'not_completed';
//             }

//             if (value) {
//               counts[value] = (counts[value] || 0) + 1;
//             }
//           });
//         }
//       });
//     }
//   });

//   return counts;
// };


// export const getChartData = (counts: Record<string, number>, labelsMap: Record<string, { label: string, color: string }>) => {
//   return Object.entries(counts).map(([key, value]) => ({
//     value,
//     label: labelsMap[key]?.label || key,
//     color: labelsMap[key]?.color || colors.GRAY
//   }));
// };

// export const delay = async (time: any) => await new Promise(resolve => setTimeout(resolve, time || 500));


// export const getColorForActionType = (actionType: string) => {
//   const colorMap: any = {
//     "Lead Created by Agent": "#42e695",
//     "Lead Created by bulk upload": "#ff7e5f",
//     "Lead Created by BDM": "#ff5858",
//     "Follow-up by Agent": "#6a11cb",
//     "On Call Discussion By BDM": "#ff9966",
//     "Meeting Completed": "#f857a6",
//     "Meeting_Office Completed": "#f857a6",
//     "Site Visit Completed": "#43cea2",
//     "Meeting_Field Completed": "#5b86e5",
//     "Estimation Requested": "#00c6ff",
//     "Estimation Request": "#00c6ff",
//     "Estimation Need for Approval": "#f7971e",
//     "Estimation Generated": "#4facfe",
//     "Estimation Shared": "#36d1dc",
//     "Estimation Rejected": "#ba0000",
//     "Lead Converted": "#56ab2f",
//     "Lead Edited By Manual": "#f39c12",
//     "Lead Edited By Call": "#f39c12",
//     "Lead Edited by Supervisor": "#2c3e50"
//   };

//   return colorMap[actionType] || "#000";
// };
