// import { getDBConnection } from "..";
// import { showMsg } from "../../../utils/showMsg";
// import { TN_TASK_DATA, TN_TASK_FORM_DATA } from "../model/tasks";
// import uuid from 'react-native-uuid';

// // INSERT (SET) TASK
// export const saveTask = async (task: any) => {
//   if (!task) return false;
//   try {
//     const db = await getDBConnection();
//     const query = `INSERT OR REPLACE INTO ${TN_TASK_DATA} (
//       uuid, id, data, is_active
//     ) VALUES (?, ?, ?, ?)`;
  
//     const values = [
//       task.uuid,
//       task.id,
//       JSON.stringify(task),
//       0
//     ];
//     const a = await db.executeSql(query, values);
//     console.log("save task done", task.uuid, task.id);
    
//     return true;
    
//   } catch (error) {
//     console.log("saveTask error: ", error);
//     return false;
//   }
// };
  
// // INSERT TASK LIST
// export const saveTaskList = async (tasks: any[]) => {
//   if (!Array.isArray(tasks) || tasks.length === 0) return false;

//   try {
//     const db = await getDBConnection();
//     const placeholders = tasks.map(() => `(?, ?, ?, ?)`).join(", ");

//     const query = `INSERT OR IGNORE INTO ${TN_TASK_DATA} (
//       id, uuid, data, is_active
//     ) VALUES ${placeholders}`;

//     const values = tasks.flatMap(task => [
//       task.id,
//       task.uuid || uuid.v4(),
//       JSON.stringify(task),
//       1
//     ]);

//     await db.executeSql(query, values);    
//     await db.close();
//     return {
//       message: "All tasks saved successfully",
//       other_task: tasks
//     };
//   } catch (error) {
//     console.log("saveTaskList error:", error);
//     return false;
//   }
// };

// // GET TASK LIST
// export const getTasksList = async () => {
//   try {
//     const db = await getDBConnection();
//     const query = `SELECT * FROM ${TN_TASK_DATA};`;
//     const results = await db.executeSql(query);

//     const tasks = results.flatMap(result =>
//       Array.from({ length: result.rows.length }, (_, index) => {
//         const item = result.rows.item(index);
//         return JSON.parse(item.data);
//       })
//     );

//     await db.close();
//     // console.log("tasks list from mysqlite", tasks);
    
//     return tasks;
//   } catch (error) {
//     console.error("Error fetching tasks list:", error);
//     return [];
//   }
// };

// export const fetchJoinedAllTasks = async () => {
//   try {
//     const db = await getDBConnection();
//     const query = `
//       SELECT 
//         T1.*, 
//         T2.data AS form_data
//       FROM 
//         ${TN_TASK_DATA} AS T1
//       LEFT JOIN 
//         ${TN_TASK_FORM_DATA} AS T2
//       ON 
//         (T1.id IS NOT NULL AND T2.id IS NOT NULL AND T1.id = T2.id)
//         OR ((T1.id IS NULL OR T2.id IS NULL) AND T1.uuid = T2.uuid)
//     `;

//     const results = await db.executeSql(query);
//     const rows = results[0]?.rows;

//     const data = Array.from({ length: rows.length }).map((_, i) => {
//       const row = rows.item(i);
//       const item: any = JSON.parse(row?.data);
//       if (row?.form_data) {
//         item.travel_form_details = JSON.parse(row?.form_data);
//       }
//       return item;
//     });
//     return data;
//   } catch (error) {
//     console.log("fetchJoinedAllTasks error: ", error);
//     return [];
//   }
// };

// // GET TASK BY ID
// export const getTaskById = async (id:string | number) => {
//   try {
//     const db = await getDBConnection();
//     const query = `SELECT * FROM ${TN_TASK_DATA} WHERE id = ? OR uuid = ?`;
//     const [result] = await db.executeSql(query,[id, id]);
//     await db.close();
//     if (result.rows.length > 0) {
//       const row = result.rows.item(0);
//       return JSON.parse(row.data);
//     }
//   } catch (error) {
//     console.error("Error fetching tasks list:", error);
//     return [];
//   }
// };


// // INSERT (SET) TASK FORM DATA
// export const saveTaskFormData = async (task: any) => {
//   if (!task) return false;
//   try {
//     const db = await getDBConnection();
//     const query = `INSERT OR REPLACE INTO ${TN_TASK_FORM_DATA} (
//       id, uuid, data, is_active
//     ) VALUES (?, ?, ?, ?)`;
  
//     const values = [
//       task.bdmLeadActionId,
//       task.bdmLeadActionUuid,
//       JSON.stringify(task),
//       0
//     ];

//     await db.executeSql(query, values);
//     const localTask:any = await getTaskById(task.bdmLeadActionUuid || task.bdmLeadActionId);
//     if(typeof(localTask) == 'object')
//       localTask['completion_status'] = "completed"
//     await saveTask(localTask);
//     console.log("form data submit====", task.bdmLeadActionId, task.bdmLeadActionUuid);
//     return true;
    
//   } catch (error) {
//     console.log("saveTask error: ", error);
//     return false;
//   }
// };

// export const saveTaskFormDataCopy = async (data: any) => {
//   if (!data) return false;
//   try {
//     const db = await getDBConnection();
//     const query = `INSERT OR REPLACE INTO ${TN_TASK_FORM_DATA} (
//       id, uuid, data, is_active
//     ) VALUES (?, ?, ?, ?)`;

//     const values = [
//       data[0].bdmLeadActionId,
//       data[0].bdmLeadActionUuid,
//       JSON.stringify(data),
//       0
//     ];

//     await db.executeSql(query, values);
//     const localTask:any = await getTaskById(data[0].bdmLeadActionUuid || data[0].bdmLeadActionId);
//     if(typeof(localTask) == 'object')
//       localTask['completion_status'] = "completed"
//     await saveTask(localTask);
//     return true;
    
//   } catch (error) {
//     console.log("saveTask error: ", error);
//     return false;
//   }
// };

// export const taskFormDataStatusChange = async (ids: any[]) => {
//   if (!ids || !Array.isArray(ids) || ids.length === 0) return false;
//   try {
//     const db = await getDBConnection();
//     const placeholders = ids.map(() => '(id = ? OR uuid = ?)').join(' OR ');

//     const query = `
//       UPDATE ${TN_TASK_FORM_DATA}
//       SET is_active = 1
//       WHERE ${placeholders}
//     `;

//     // Flatten the array: [id1, id1, id2, id2, ...]
//     const params = ids.flatMap(id => [id, id]);
//     await db.executeSql(query, params);
//     return true;

//   } catch (error) {
//     console.log("taskFormDataStatusChange error: ", error);
//     return false;
//   }
// };

// export const taskStatusChange = async (ids: any[]) => {
//   if (!ids || !Array.isArray(ids) || ids.length === 0) return false;
//   try {
//     const db = await getDBConnection();
//     const placeholders = ids.map(() => '(id = ? OR uuid = ?)').join(' OR ');

//     const query = `
//       UPDATE ${TN_TASK_DATA}
//       SET is_active = 1
//       WHERE ${placeholders}
//     `;

//     // Flatten the array: [id1, id1, id2, id2, ...]
//     const params = ids.flatMap(id => [id, id]);
//     await db.executeSql(query, params);
//     return true;

//   } catch (error) {
//     console.log("taskStatusChange error: ", error);
//     return false;
//   }
// };

// // GET TASK FORM LIST
// export const getTasksFormList = async () => {
//   try {
//     const db = await getDBConnection();
//     const query = `SELECT * FROM ${TN_TASK_FORM_DATA} WHERE is_active = 0;`;
//     // const query = `SELECT * FROM ${TN_TASK_FORM_DATA};`;
//     const results = await db.executeSql(query);

//     const tasks_form_data = results.flatMap(result =>
//       Array.from({ length: result.rows.length }, (_, index) => {
//         const item = result.rows.item(index);
//         console.log(item);
//         return JSON.parse(item.data);
//       })
//     );

//     await db.close();
//     console.log("task form list from mysqlite", tasks_form_data);
    
//     return tasks_form_data;
//   } catch (error) {
//     console.error("Error fetching tasks list:", error);
//     return [];
//   }
// };


// export const fetchJoinedInactiveTaskData = async () => {
//   try {
//     const db = await getDBConnection();
//     const query = `
//       SELECT 
//         T1.*, 
//         T2.data AS form_data
//       FROM 
//         ${TN_TASK_DATA} AS T1
//       LEFT JOIN 
//         ${TN_TASK_FORM_DATA} AS T2
//       ON 
//         (T1.id IS NOT NULL AND T2.id IS NOT NULL AND T1.id = T2.id)
//         OR ((T1.id IS NULL OR T2.id IS NULL) AND T1.uuid = T2.uuid)
//       WHERE 
//         T1.is_active = 0 OR T2.is_active = 0
//     `;

//     const results = await db.executeSql(query);
//     const rows = results[0]?.rows;

//     const data = Array.from({ length: rows.length }).map((_, i) => {
//       const row = rows.item(i);
//       const item: any = JSON.parse(row?.data);
//       item.form_data = JSON.parse(row?.form_data);
//       item.LeadId = item.LeadId || item.leadId || item?.lead?.Id || item?.lead?.id;
//       return item;
//     });


//     return data;
//   } catch (error) {
//     console.log("fetchJoinedInactiveTaskData error: ", error);
//     return [];
//   }
// };

// export const getTaskFormDataById = async (id:string | number) => {
//   try {
//     const db = await getDBConnection();
//     const query = `SELECT * FROM ${TN_TASK_FORM_DATA} WHERE (id = ? OR uuid = ?) AND is_active = 0`;
//     const [result] = await db.executeSql(query,[id, id]);
    
//     await db.close();
//     if (result.rows.length > 0) {
//       const row = result.rows.item(0);
//       const item: any = JSON.parse(row?.data);
//       return item;
//     }
//     return false;
//   } catch (error) {
//     console.error("Error fetching tasks list:", error);
//     return false;
//   }
// };





// // GET TASK BY ID
// // export const getTaskByIdOnly = async (id:string | number) => {
// //   try {
// //     const db = await getDBConnection();
// //     const query = `SELECT * FROM ${TN_TASK_DATA} WHERE id = ? OR uuid = ?`;
// //     const [result] = await db.executeSql(query,[id, id]);
// //     await db.close();
// //     if (result.rows.length > 0) {
// //       const row = result.rows.item(0);
// //       console.log("get by id only =", row);
// //       return row;
// //     }
// //   } catch (error) {
// //     console.error("Error fetching tasks list:", error);
// //     return [];
// //   }
// // };
  