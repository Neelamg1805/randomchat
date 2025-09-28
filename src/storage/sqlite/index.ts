// import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
// import { createTableQureyMasterData, TN_MASTER_DATA, } from './model/masterData';
// import { createTableQureyTaks, createTableQureyTaksFormData, TN_TASK_DATA, TN_TASK_FORM_DATA } from './model/tasks';
// import { createTableQureyLeads, TN_LEADS } from './model/leads';
// import { createTableQureyEstmations, TN_ESTIMATIONS } from './model/estimations';

// enablePromise(true);

// export const getDBConnection = async () => {
//     return openDatabase(
//         { name: 'abiscrm.db', location: "default" },
//         () => { },
//         (error) => {
//             console.error(error)
//             throw Error("Could not connect to database")
//         }
//     )
// }

// export const createTable = async () => {
//     const db = await getDBConnection();
//     try {
//         // new table entry here
//         await db.executeSql(`DROP TABLE IF EXISTS ${TN_MASTER_DATA}`);
//         await db.executeSql(`DROP TABLE IF EXISTS ${TN_TASK_DATA}`);
//         await db.executeSql(`DROP TABLE IF EXISTS ${TN_LEADS}`);
//         await db.executeSql(`DROP TABLE IF EXISTS ${TN_TASK_FORM_DATA}`);
//         await db.executeSql(`DROP TABLE IF EXISTS ${TN_ESTIMATIONS}`);
//     } catch (error) {
//         console.log("Table drop error:", error);
//     }

//     try {
//         // new table entry here
//         await db.executeSql(createTableQureyMasterData);
//         await db.executeSql(createTableQureyTaks);
//         await db.executeSql(createTableQureyLeads);
//         await db.executeSql(createTableQureyTaksFormData);
//         await db.executeSql(createTableQureyEstmations);
//     } catch (error) {
//         console.log("Error in Create Table:", error);
//     }
// };