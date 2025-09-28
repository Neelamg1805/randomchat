// import AsyncStorage from "@react-native-async-storage/async-storage";


// // Save Auth
// export async function asyncSetAuth(data: any) {
//   try {
//     console.log("👉 [asyncSetAuth] Saving Auth:", data);
//     await AsyncStorage.setItem("authorization", JSON.stringify(data));
//     console.log("✅ [asyncSetAuth] Saved successfully!");
//   } catch (err) {
//     console.error("❌ [asyncSetAuth] Error:", err);
//   }
// }

// // Get Auth
// export async function asyncGetAuth() {
//   try {
//     const data = await AsyncStorage.getItem("authorization");
//     console.log("👉 [asyncGetAuth] Raw value from storage:", data);

//     if (data) {
//       const parsed = JSON.parse(data);
//       console.log("✅ [asyncGetAuth] Parsed Auth:", parsed);
//       return parsed;
//     }

//     console.log("⚠️ [asyncGetAuth] No auth found in storage.");
//     return null;
//   } catch (err) {
//     console.error("❌ [asyncGetAuth] Error:", err);
//     return null;
//   }
// }

// // Save User
// export async function asyncSetUser(data: any) {
//   try {
//     console.log("👉 [asyncSetUser] Saving User:", data);
//     await AsyncStorage.setItem("user", JSON.stringify(data));
//     console.log("✅ [asyncSetUser] Saved successfully!");
//   } catch (err) {
//     console.error("❌ [asyncSetUser] Error:", err);
//   }
// }

// // Get User
// export async function asyncGetUser() {
//   try {
//     const data = await AsyncStorage.getItem("user");
//     console.log("👉 [asyncGetUser] Raw value from storage:", data);

//     if (data) {
//       const parsed = JSON.parse(data);
//       console.log("✅ [asyncGetUser] Parsed User:", parsed);
//       return parsed;
//     }

//     console.log("⚠️ [asyncGetUser] No user found in storage.");
//     return null;
//   } catch (err) {
//     console.error("❌ [asyncGetUser] Error:", err);
//     return null;
//   }
// }



// export function asyncSetRememberedCredentials(id: string, password: string) {
//   AsyncStorage.setItem("rememberedCredentials", JSON.stringify({ id, password }));
// }

// export async function asyncGetRememberedCredentials() {
//   const data = await AsyncStorage.getItem("rememberedCredentials");
//   return data ? JSON.parse(data) : null;
// }

// export function asyncRemoveRememberedCredentials() {
//   AsyncStorage.removeItem("rememberedCredentials");
// }


// export function asyncLogout() {
//     AsyncStorage.removeItem('user');
//     AsyncStorage.removeItem('authorization');
// }

// export async function asyncGetDeviceToken() {
//     let data: any = await AsyncStorage.getItem('deviceToken');
//     return JSON.parse(data);
// }

// export function asyncSetDeviceToken(data: any) {
//     AsyncStorage.setItem("deviceToken", JSON.stringify(data));
// }