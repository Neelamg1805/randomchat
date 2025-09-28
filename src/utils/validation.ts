// import queryString from 'query-string';

// export async function validatePass(password: string, translations: any) {
//   let res = '';
//   var re = {
//     capital: /(?=.*[A-Z])/,
//     length: /(?=.{8,40}$)/,
//     specialChar: /[ -\/:-@\[-\`{-~]/,
//     digit: /(?=.*[0-9])/,
//   };

//   if (password.length <= 0) {
//     res = translations?.["password.error.required"];
//   } else if (!re.length.test(password)) {
//     res = translations?.["password.error.length"];
//   } else if (!re.capital.test(password)) {
//     res = translations?.["password.error.one.uppercase"];
//   } else if (!re.digit.test(password)) {
//     res = translations?.["password.error.one.digit"];
//   } else if (!re.specialChar.test(password)) {
//     res = translations?.["password.error.special.character"];
//   }

//   return res;
// }

// export async function validateConfirmPass(password: string, confirmPassword: string, translations: any) {
//   let res = ''
//   if (!password || !confirmPassword) {
//     res = translations?.["confirm.password.error.required"];
//   } else if (password != confirmPassword) {
//     res = translations?.["confirm.password.error.mismatch"];
//   }

//   return res
// }

// export async function validateEmail(email: string, translations: any) {
//   let res = '';
//   var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

//   if (email.length <= 0) {
//     res = translations?.["email.error.required"];
//   } else if (!re.test(email)) {
//     res = translations?.["email.error.invalid"];
//   }

//   return res;
// }

// export const parseurl = (url: any) => {
//   if (url) {
//     let urlSplit = url.split('/')[3]
//     if (urlSplit) {
//       let screenName = urlSplit.split('?')[0]
//       if (screenName) {
//         const queryParams = queryString.parseUrl(url).query;
//         if (url.includes(screenName)) {
//           return { screenName, queryParams }
//         } else {
//           return null
//         }
//       } else {
//         return null
//       }
//     } else {
//       return null
//     }
//   } else {
//     return null
//   }
// }

// export function validateUrl(str: string) {
//   if (str !== str.toLowerCase()) {
//     return false;
//   }
//   const pattern = new RegExp(
//     '^(https?:\\/\\/)?' + // protocol
//     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
//     '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
//     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
//     '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
//     '(\\#[-a-z\\d_]*)?$', // fragment locator
//     'i'
//   );
//   return pattern.test(str);
// }

// export function validatePhoneNumber(phonenumber: string) {
//   let regex = /^\+[1-9]{1}[0-9]{7,11}$/;
//   if (phonenumber == null || phonenumber == '') {
//     return "false";
//   }
//   return regex.test(phonenumber);
// }