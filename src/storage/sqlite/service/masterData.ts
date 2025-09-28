// import { getDBConnection } from "..";
// import { TN_MASTER_DATA } from "../model/masterData";


// export const saveTaskTypes = async (data: any) => {
//   if (!data || data.length < 1) return false;

//   try {
//     const db = await getDBConnection();
//     const insertQuery = `INSERT OR REPLACE INTO ${TN_MASTER_DATA} (data_key, data) VALUES (?, ?)`;
//     const values = ['task_type', JSON.stringify(data)];

//     await db.executeSql(insertQuery, values);
//     return true;
//   } catch (error) {
//     console.log("saveTaskTypes error: ", error);
//     return false;
//   }
// };

// export const getTaskTypes = async (): Promise<any[] | null> => {
//   try {
//     const db = await getDBConnection();

//     const selectQuery = `SELECT data FROM ${TN_MASTER_DATA} WHERE data_key = ?`;
//     const results = await db.executeSql(selectQuery, ['task_type']);

//     if (results[0].rows.length > 0) {
//       const row = results[0].rows.item(0);
//       return JSON.parse(row.data);
//     }

//     return null;
//   } catch (error) {
//     console.log("getTaskTypes error: ", error);
//     return null;
//   }
// };

// export const saveBranchList = async (data: any) => {
//   if (!data || data.length < 1) return false;

//   try {
//     const db = await getDBConnection();
//     const insertQuery = `INSERT OR REPLACE INTO ${TN_MASTER_DATA} (data_key, data) VALUES (?, ?)`;
//     const values = ['branch_list', JSON.stringify(data)];

//     await db.executeSql(insertQuery, values);
//     return true;
//   } catch (error) {
//     console.log("saveBranchList error: ", error);
//     return false;
//   }
// };

// export const getBranchList = async (): Promise<any[] | null> => {
//   try {
//     const db = await getDBConnection();

//     const selectQuery = `SELECT data FROM ${TN_MASTER_DATA} WHERE data_key = ?`;
//     const results = await db.executeSql(selectQuery, ['branch_list']);

//     if (results[0].rows.length > 0) {
//       const row = results[0].rows.item(0);
//       return JSON.parse(row.data);
//     }

//     return null;
//   } catch (error) {
//     console.log("getTaskTypes error: ", error);
//     return null;
//   }
// };

// export const saveRoList = async (data: any) => {
//   if (!data || data.length < 1) return false;

//   try {
//     const db = await getDBConnection();
//     const insertQuery = `INSERT OR REPLACE INTO ${TN_MASTER_DATA} (data_key, data) VALUES (?, ?)`;
//     const values = ['ro_list', JSON.stringify(data)];

//     await db.executeSql(insertQuery, values);
//     return true;
//   } catch (error) {
//     console.log("saveBranchList error: ", error);
//     return false;
//   }
// };

// export const getRoList = async (): Promise<any[] | null> => {
//   try {
//     const db = await getDBConnection();

//     const selectQuery = `SELECT data FROM ${TN_MASTER_DATA} WHERE data_key = ?`;
//     const results = await db.executeSql(selectQuery, ['ro_list']);

//     if (results[0].rows.length > 0) {
//       const row = results[0].rows.item(0);
//       return JSON.parse(row.data);
//     }

//     return null;
//   } catch (error) {
//     console.log("getTaskTypes error: ", error);
//     return null;
//   }
// };

// export const saveHoList = async (data: any) => {
//   if (!data || data.length < 1) return false;

//   try {
//     const db = await getDBConnection();
//     const insertQuery = `INSERT OR REPLACE INTO ${TN_MASTER_DATA} (data_key, data) VALUES (?, ?)`;
//     const values = ['ho_list', JSON.stringify(data)];

//     await db.executeSql(insertQuery, values);
//     return true;
//   } catch (error) {
//     console.log("saveHoList error: ", error);
//     return false;
//   }
// };

// export const getHoList = async (): Promise<any[] | null> => {
//   try {
//     const db = await getDBConnection();

//     const selectQuery = `SELECT data FROM ${TN_MASTER_DATA} WHERE data_key = ?`;
//     const results = await db.executeSql(selectQuery, ['ho_list']);

//     if (results[0].rows.length > 0) {
//       const row = results[0].rows.item(0);
//       return JSON.parse(row.data);
//     }

//     return null;
//   } catch (error) {
//     console.log("getTaskTypes error: ", error);
//     return null;
//   }
// };

// export const saveCategoryList = async (data: any) => {
//   if (!data || data.length < 1) return false;

//   try {
//     const db = await getDBConnection();
//     const insertQuery = `INSERT OR REPLACE INTO ${TN_MASTER_DATA} (data_key, data) VALUES (?, ?)`;
//     const values = ['categories', JSON.stringify(data)];
//     await db.executeSql(insertQuery, values);
//     return true;
//   } catch (error) {
//     console.log("saveBranchList error: ", error);
//     return false;
//   }
// };
// export const getCategoryList = async (): Promise<any[] | null> => {
//   try {
//     const db = await getDBConnection();

//     const selectQuery = `SELECT data FROM ${TN_MASTER_DATA} WHERE data_key = ?`;
//     const results = await db.executeSql(selectQuery, ['categories']);

//     if (results[0].rows.length > 0) {
//       const row = results[0].rows.item(0);
//       return JSON.parse(row.data);
//     }

//     return null;
//   } catch (error) {
//     console.log("getTaskTypes error: ", error);
//     return null;
//   }
// };

// export const saveAvailableLandList = async (data: any) => {
//   if (!data || data.length < 1) return false;

//   try {
//     const db = await getDBConnection();
//     const insertQuery = `INSERT OR REPLACE INTO ${TN_MASTER_DATA} (data_key, data) VALUES (?, ?)`;
//     const values = ['available_land', JSON.stringify(data)];
//     await db.executeSql(insertQuery, values);
//     return true;
//   } catch (error) {
//     console.log("save available land error: ", error);
//     return false;
//   }
// };
// export const getAvailableLandList = async (): Promise<any[] | null> => {
//   try {
//     const db = await getDBConnection();

//     const selectQuery = `SELECT data FROM ${TN_MASTER_DATA} WHERE data_key = ?`;
//     const results = await db.executeSql(selectQuery, ['available_land']);

//     if (results[0].rows.length > 0) {
//       const row = results[0].rows.item(0);
//       return JSON.parse(row.data);
//     }

//     return null;
//   } catch (error) {
//     console.log("get available land error: ", error);
//     return null;
//   }
// };

// export const saveNetWorthList = async (data: any) => {
//   if (!data || data.length < 1) return false;

//   try {
//     const db = await getDBConnection();
//     const insertQuery = `INSERT OR REPLACE INTO ${TN_MASTER_DATA} (data_key, data) VALUES (?, ?)`;
//     const values = ['net_worth', JSON.stringify(data)];
//     await db.executeSql(insertQuery, values);
//     return true;
//   } catch (error) {
//     console.log("save net worth error: ", error);
//     return false;
//   }
// };
// export const getNetWorthList = async (): Promise<any[] | null> => {
//   try {
//     const db = await getDBConnection();

//     const selectQuery = `SELECT data FROM ${TN_MASTER_DATA} WHERE data_key = ?`;
//     const results = await db.executeSql(selectQuery, ['net_worth']);

//     if (results[0].rows.length > 0) {
//       const row = results[0].rows.item(0);
//       return JSON.parse(row.data);
//     }

//     return null;
//   } catch (error) {
//     console.log("get net worth error: ", error);
//     return null;
//   }
// };

// export const saveCurrentBusinessWorkList = async (data: any) => {
//   if (!data || data.length < 1) return false;

//   try {
//     const db = await getDBConnection();
//     const insertQuery = `INSERT OR REPLACE INTO ${TN_MASTER_DATA} (data_key, data) VALUES (?, ?)`;
//     const values = ['current_business_work', JSON.stringify(data)];
//     await db.executeSql(insertQuery, values);
//     return true;
//   } catch (error) {
//     console.log("save current business work error: ", error);
//     return false;
//   }
// };
// export const getCurrentBusinessWorkList = async (): Promise<any[] | null> => {
//   try {
//     const db = await getDBConnection();

//     const selectQuery = `SELECT data FROM ${TN_MASTER_DATA} WHERE data_key = ?`;
//     const results = await db.executeSql(selectQuery, ['current_business_work']);

//     if (results[0].rows.length > 0) {
//       const row = results[0].rows.item(0);
//       return JSON.parse(row.data);
//     }

//     return null;
//   } catch (error) {
//     console.log("get current business work error: ", error);
//     return null;
//   }
// };

// export const saveModelTypes = async (data: any) => {
//   if (!data || data.length < 1) return false;

//   try {
//     const db = await getDBConnection();
//     const insertQuery = `INSERT OR REPLACE INTO ${TN_MASTER_DATA} (data_key, data) VALUES (?, ?)`;
//     const values = ['model_types', JSON.stringify(data)];
//     await db.executeSql(insertQuery, values);
//     return true;
//   } catch (error) {
//     console.log("saveBranchList error: ", error);
//     return false;
//   }
// };
// export const getModelTypes = async (): Promise<any[] | null> => {
//   try {
//     const db = await getDBConnection();

//     const selectQuery = `SELECT data FROM ${TN_MASTER_DATA} WHERE data_key = ?`;
//     const results = await db.executeSql(selectQuery, ['model_types']);

//     if (results[0].rows.length > 0) {
//       const row = results[0].rows.item(0);
//       return JSON.parse(row.data);
//     }

//     return null;
//   } catch (error) {
//     console.log("getTaskTypes error: ", error);
//     return null;
//   }
// };

// export const saveVisitPurposes = async (data: any) => {
//   if (!data || data.length < 1) return false;

//   try {
//     const db = await getDBConnection();
//     const insertQuery = `INSERT OR REPLACE INTO ${TN_MASTER_DATA} (data_key, data) VALUES (?, ?)`;
//     const values = ['visit_purposes', JSON.stringify(data)];

//     await db.executeSql(insertQuery, values);
//     return true;
//   } catch (error) {
//     console.log("saveBranchList error: ", error);
//     return false;
//   }
// };
// export const getVisitPurposes = async (): Promise<any[] | null> => {
//   try {
//     const db = await getDBConnection();

//     const selectQuery = `SELECT data FROM ${TN_MASTER_DATA} WHERE data_key = ?`;
//     const results = await db.executeSql(selectQuery, ['visit_purposes']);

//     if (results[0].rows.length > 0) {
//       const row = results[0].rows.item(0);
//       return JSON.parse(row.data);
//     }

//     return null;
//   } catch (error) {
//     console.log("getTaskTypes error: ", error);
//     return null;
//   }
// };

// export const saveAdminTasks = async (data: any) => {
//   if (!data || data.length < 1) return false;

//   try {
//     const db = await getDBConnection();
//     const insertQuery = `INSERT OR REPLACE INTO ${TN_MASTER_DATA} (data_key, data) VALUES (?, ?)`;
//     const values = ['admin_tasks', JSON.stringify(data)];

//     await db.executeSql(insertQuery, values);
//     return true;
//   } catch (error) {
//     console.log("saveBranchList error: ", error);
//     return false;
//   }
// };
// export const getAdminTasks = async (): Promise<any[] | null> => {
//   try {
//     const db = await getDBConnection();

//     const selectQuery = `SELECT data FROM ${TN_MASTER_DATA} WHERE data_key = ?`;
//     const results = await db.executeSql(selectQuery, ['admin_tasks']);

//     if (results[0].rows.length > 0) {
//       const row = results[0].rows.item(0);
//       return JSON.parse(row.data);
//     }

//     return null;
//   } catch (error) {
//     console.log("getTaskTypes error: ", error);
//     return null;
//   }
// };

// export const saveModeOfTravel = async (data: any) => {
//   if (!data || data.length < 1) return false;

//   try {
//     const db = await getDBConnection();
//     const insertQuery = `INSERT OR REPLACE INTO ${TN_MASTER_DATA} (data_key, data) VALUES (?, ?)`;
//     const values = ['mode_of_travel', JSON.stringify(data)];

//     await db.executeSql(insertQuery, values);
//     return true;
//   } catch (error) {
//     console.log("saveHoList error: ", error);
//     return false;
//   }
// };

// export const getModeOfTravel = async (): Promise<any[] | null> => {
//   try {
//     const db = await getDBConnection();

//     const selectQuery = `SELECT data FROM ${TN_MASTER_DATA} WHERE data_key = ?`;
//     const results = await db.executeSql(selectQuery, ['mode_of_travel']);

//     if (results[0].rows.length > 0) {
//       const row = results[0].rows.item(0);
//       return JSON.parse(row.data);
//     }

//     return null;
//   } catch (error) {
//     console.log("getTaskTypes error: ", error);
//     return null;
//   }
// };


// export const saveTravelReasons = async (data: any) => {
//   if (!data || data.length < 1) return false;

//   try {
//     const db = await getDBConnection();
//     const insertQuery = `INSERT OR REPLACE INTO ${TN_MASTER_DATA} (data_key, data) VALUES (?, ?)`;
//     const values = ['travel_reasons', JSON.stringify(data)];

//     await db.executeSql(insertQuery, values);
//     return true;
//   } catch (error) {
//     console.log("saveHoList error: ", error);
//     return false;
//   }
// };

// export const getTravelReasons = async (): Promise<any[] | null> => {
//   try {
//     const db = await getDBConnection();

//     const selectQuery = `SELECT data FROM ${TN_MASTER_DATA} WHERE data_key = ?`;
//     const results = await db.executeSql(selectQuery, ['travel_reasons']);

//     if (results[0].rows.length > 0) {
//       const row = results[0].rows.item(0);
//       return JSON.parse(row.data);
//     }

//     return null;
//   } catch (error) {
//     console.log("getTaskTypes error: ", error);
//     return null;
//   }
// };
// export const deleteTaskTypes = async (): Promise<boolean> => {
//   try {
//     const db = await getDBConnection();

//     const deleteQuery = `DELETE FROM ${TN_MASTER_DATA} WHERE data_key = ?`;
//     await db.executeSql(deleteQuery, ['task_type']);

//     return true;
//   } catch (error) {
//     console.log("deleteTaskTypes error: ", error);
//     return false;
//   }
// };

// // for leads

// // enquiry types
// export const saveEnquiryTypes = async (data: any) => {
//   if (!data || data.length < 1) return false;

//   try {
//     const db = await getDBConnection();
//     const insertQuery = `INSERT OR REPLACE INTO ${TN_MASTER_DATA} (data_key, data) VALUES (?, ?)`;
//     const values = ['enquiry_type', JSON.stringify(data)];

//     await db.executeSql(insertQuery, values);
//     return true;
//   } catch (error) {
//     console.log("save enquiry_type error: ", error);
//     return false;
//   }
// };

// export const getAllEnquiryTypes = async (): Promise<any[] | null> => {
//   try {
//     const db = await getDBConnection();

//     const selectQuery = `SELECT data FROM ${TN_MASTER_DATA} WHERE data_key = ?`;
//     const results = await db.executeSql(selectQuery, ['enquiry_type']);

//     if (results[0].rows.length > 0) {
//       const row = results[0].rows.item(0);
//       return JSON.parse(row.data);
//     }

//     return null;
//   } catch (error) {
//     console.log("get enquiry_type error: ", error);
//     return null;
//   }
// };

// // categories
// export const saveCategories = async (data: any) => {
//   if (!data || data.length < 1) return false;

//   try {
//     const db = await getDBConnection();
//     const insertQuery = `INSERT OR REPLACE INTO ${TN_MASTER_DATA} (data_key, data) VALUES (?, ?)`;
//     const values = ['categories', JSON.stringify(data)];

//     await db.executeSql(insertQuery, values);
//     return true;
//   } catch (error) {
//     console.log("save categories error: ", error);
//     return false;
//   }
// };

// export const getAllCategories = async (): Promise<any[] | null> => {
//   try {
//     const db = await getDBConnection();

//     const selectQuery = `SELECT data FROM ${TN_MASTER_DATA} WHERE data_key = ?`;
//     const results = await db.executeSql(selectQuery, ['categories']);

//     if (results[0].rows.length > 0) {
//       const row = results[0].rows.item(0);
//       return JSON.parse(row.data);
//     }

//     return null;
//   } catch (error) {
//     console.log("get categories error: ", error);
//     return null;
//   }
// };

// // sub categories
// export const saveSubCategories = async (data: any) => {
//   if (!data || data.length < 1) return false;

//   try {
//     const db = await getDBConnection();
//     const insertQuery = `INSERT OR REPLACE INTO ${TN_MASTER_DATA} (data_key, data) VALUES (?, ?)`;
//     const values = ['sub_categories', JSON.stringify(data)];

//     await db.executeSql(insertQuery, values);
//     return true;
//   } catch (error) {
//     console.log("save sub_categories error: ", error);
//     return false;
//   }
// };

// // projects
// export const saveProjects = async (data: any) => {
//   if (!data || data.length < 1) return false;

//   try {
//     const db = await getDBConnection();
//     const insertQuery = `INSERT OR REPLACE INTO ${TN_MASTER_DATA} (data_key, data) VALUES (?, ?)`;
//     const values = ['projects', JSON.stringify(data)];

//     await db.executeSql(insertQuery, values);
//     return true;
//   } catch (error) {
//     console.log("save projects error: ", error);
//     return false;
//   }
// };

// export const getAllProjects = async (): Promise<any[] | null> => {
//   try {
//     const db = await getDBConnection();

//     const selectQuery = `SELECT data FROM ${TN_MASTER_DATA} WHERE data_key = ?`;
//     const results = await db.executeSql(selectQuery, ['projects']);

//     if (results[0].rows.length > 0) {
//       const row = results[0].rows.item(0);
//       return JSON.parse(row.data);
//     }

//     return null;
//   } catch (error) {
//     console.log("get projects error: ", error);
//     return null;
//   }
// };

// // employee branches
// export const saveEmployeeBranches = async (data: any) => {
//   if (!data || data.length < 1) return false;

//   try {
//     const db = await getDBConnection();
//     const insertQuery = `INSERT OR REPLACE INTO ${TN_MASTER_DATA} (data_key, data) VALUES (?, ?)`;
//     const values = ['employee_branches', JSON.stringify(data)];

//     await db.executeSql(insertQuery, values);
//     return true;
//   } catch (error) {
//     console.log("save employee_branches error: ", error);
//     return false;
//   }
// };

// export const getAllEmployeeBranches = async (): Promise<any[] | null> => {
//   try {
//     const db = await getDBConnection();

//     const selectQuery = `SELECT data FROM ${TN_MASTER_DATA} WHERE data_key = ?`;
//     const results = await db.executeSql(selectQuery, ['employee_branches']);

//     if (results[0].rows.length > 0) {
//       const row = results[0].rows.item(0);
//       return JSON.parse(row.data);
//     }

//     return null;
//   } catch (error) {
//     console.log("get employee_branches error: ", error);
//     return null;
//   }
// };

// // lead sources
// export const saveLeadSources = async (data: any) => {
//   if (!data || data.length < 1) return false;

//   try {
//     const db = await getDBConnection();
//     const insertQuery = `INSERT OR REPLACE INTO ${TN_MASTER_DATA} (data_key, data) VALUES (?, ?)`;
//     const values = ['lead_sources', JSON.stringify(data)];

//     await db.executeSql(insertQuery, values);
//     return true;
//   } catch (error) {
//     console.log("save lead_sources error: ", error);
//     return false;
//   }
// };

// export const getAllLeadSources = async (): Promise<any[] | null> => {
//   try {
//     const db = await getDBConnection();

//     const selectQuery = `SELECT data FROM ${TN_MASTER_DATA} WHERE data_key = ?`;
//     const results = await db.executeSql(selectQuery, ['lead_sources']);

//     if (results[0].rows.length > 0) {
//       const row = results[0].rows.item(0);
//       return JSON.parse(row.data);
//     }

//     return null;
//   } catch (error) {
//     console.log("get lead_sources error: ", error);
//     return null;
//   }
// };

// // lead owners
// export const saveLeadOwners = async (data: any) => {
//   if (!data || data.length < 1) return false;

//   try {
//     const db = await getDBConnection();
//     const insertQuery = `INSERT OR REPLACE INTO ${TN_MASTER_DATA} (data_key, data) VALUES (?, ?)`;
//     const values = ['lead_owners', JSON.stringify(data)];

//     await db.executeSql(insertQuery, values);
//     return true;
//   } catch (error) {
//     console.log("save lead_owners error: ", error);
//     return false;
//   }
// };

// export const getLeadOwnersByRegionId = async (RegionId: any): Promise<any[] | null> => {
//   try {
//     const db = await getDBConnection();

//     const selectQuery = `SELECT data FROM ${TN_MASTER_DATA} WHERE data_key = ?`;
//     const results = await db.executeSql(selectQuery, ['lead_owners']);

//     if (results[0].rows.length > 0) {
//       const row = results[0].rows.item(0);
//       const data = JSON.parse(row.data);
//       if(data.length){
//        return data.filter((item:any)=> item.RegionId === RegionId)
//       }
//       return null;
//     }
//     return null;
//   } catch (error) {
//     console.log("get lead_sources error: ", error);
//     return null;
//   }
// };

// // modal types
// export const saveModalTypes = async (data: any) => {
//   if (!data || data.length < 1) return false;

//   try {
//     const db = await getDBConnection();
//     const insertQuery = `INSERT OR REPLACE INTO ${TN_MASTER_DATA} (data_key, data) VALUES (?, ?)`;
//     const values = ['modal_types', JSON.stringify(data)];

//     await db.executeSql(insertQuery, values);
//     return true;
//   } catch (error) {
//     console.log("modal_types error: ", error);
//     return false;
//   }
// };

// export const getModalTypesOffline = async (): Promise<any[] | null> => {
//   try {
//     const db = await getDBConnection();

//     const selectQuery = `SELECT data FROM ${TN_MASTER_DATA} WHERE data_key = ?`;
//     const results = await db.executeSql(selectQuery, ['modal_types']);

//     if (results[0].rows.length > 0) {
//       const row = results[0].rows.item(0);
//       return JSON.parse(row.data);
//     }

//     return null;
//   } catch (error) {
//     console.log("get projects error: ", error);
//     return null;
//   }
// };

// export const saveCseAgents = async (data: any) => {
//   if (!data || data.length < 1) return false;

//   try {
//     const db = await getDBConnection();
//     const insertQuery = `INSERT OR REPLACE INTO ${TN_MASTER_DATA} (data_key, data) VALUES (?, ?)`;
//     const values = ['cse', JSON.stringify(data)];

//     await db.executeSql(insertQuery, values);
//     return true;
//   } catch (error) {
//     console.log("cse error: ", error);
//     return false;
//   }
// };

// export const getAllCseAgentsOffline = async (): Promise<any[] | null> => {
//   try {
//     const db = await getDBConnection();

//     const selectQuery = `SELECT data FROM ${TN_MASTER_DATA} WHERE data_key = ?`;
//     const results = await db.executeSql(selectQuery, ['cse']);

//     if (results[0].rows.length > 0) {
//       const row = results[0].rows.item(0);
//       return JSON.parse(row.data);
//     }

//     return null;
//   } catch (error) {
//     console.log("get cse error: ", error);
//     return null;
//   }
// };