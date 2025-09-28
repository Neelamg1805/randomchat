// import { getDBConnection } from "..";
// import { TN_ESTIMATIONS } from "../model/estimations";

// export const getAllEstimationsRequestByLeadIdOffline = async (leadId: any) => {
//     try {
//         const db = await getDBConnection();
//         const query = `SELECT * FROM ${TN_ESTIMATIONS} WHERE LeadDetailId = ? OR LeadDetailUuid = ?`;
//         const results = await db.executeSql(query, [leadId, leadId]);

//         const rows = results[0]?.rows;
//         const estimations: any[] = [];
//         for (let i = 0; i < rows.length; i++) {
//             estimations.push(rows.item(i));
//         }
//         return estimations;
//     } catch (error) {
//         console.error("estimation by id error:", error);
//         return [];
//     }
// }

// export const getEstimationsRequestByLeadIdOffline = async (leadId: any) => {
//     try {
//         const db = await getDBConnection();
//         const query = `SELECT * FROM ${TN_ESTIMATIONS} WHERE (LeadDetailId = ? OR LeadDetailUuid = ?) AND (status = 'Pending' OR status = 'rejected' OR status = 'Need for Approval') ORDER BY createdAt DESC`;
//         const results = await db.executeSql(query, [leadId, leadId]);

//         const rows = results[0]?.rows;
//         const estimations: any[] = [];
//         for (let i = 0; i < rows.length; i++) {
//             estimations.push(rows.item(i));
//         }
//         return estimations;
//     } catch (error) {
//         console.error("estimation by id error:", error);
//         return null;
//     }
// }

// export const getEstimationsGeneratedByLeadIdOffline = async (leadId: any) => {
//     try {
//         const db = await getDBConnection();
//         const query = `SELECT * FROM ${TN_ESTIMATIONS} WHERE LeadDetailId = ? AND status = 'Generated' ORDER BY createdAt DESC`;
//         const results = await db.executeSql(query, [leadId]);

//         const rows = results[0]?.rows;
//         const estimations: any[] = [];
//         for (let i = 0; i < rows.length; i++) {
//             estimations.push(rows.item(i));
//         }

//         return estimations;
//     } catch (error) {
//         console.error("estimation by id error:", error);
//         return null;
//     }
// }

// export const getEstimationsSharedByLeadIdOffline = async (leadId: any) => {
//     try {
//         const db = await getDBConnection();
//         const query = `SELECT * FROM ${TN_ESTIMATIONS} WHERE LeadDetailId = ? AND status = 'Estimation Shared' ORDER BY createdAt DESC`;
//         const results = await db.executeSql(query, [leadId]);

//         const rows = results[0]?.rows;
//         const estimations: any[] = [];
//         for (let i = 0; i < rows.length; i++) {
//             estimations.push(rows.item(i));
//         }

//         return estimations;
//     } catch (error) {
//         console.error("estimation by id error:", error);
//         return null;
//     }
// }
// export const getEstimationsConvertedByLeadIdOffline = async (leadId: any) => {
//     try {
//         const db = await getDBConnection();
//         const query = `SELECT * FROM ${TN_ESTIMATIONS} WHERE LeadDetailId = ? AND status = 'converted' ORDER BY createdAt DESC`;
//         const results = await db.executeSql(query, [leadId]);

//         const rows = results[0]?.rows;
//         const estimations: any[] = [];
//         for (let i = 0; i < rows.length; i++) {
//             estimations.push(rows.item(i));
//         }

//         return estimations;
//     } catch (error) {
//         console.error("estimation by id error:", error);
//         return null;
//     }
// }
// export const saveMultipleEstimationsInBatches = async (estimations: any[]) => {
//     if (!estimations || estimations.length === 0) return false;

//     const BATCH_SIZE = 20;

//     try {
//         const db = await getDBConnection();

//         const columns = Object.keys(estimations[0]);

//         for (let i = 0; i < estimations.length; i += BATCH_SIZE) {
//             const batch = estimations.slice(i, i + BATCH_SIZE);

//             const placeholders = batch
//                 .map(() => `(${columns.map(() => '?').join(', ')})`)
//                 .join(', ');

//             const values: any[] = [];
//             for (const row of batch) {
//                 for (const column of columns) {
//                     values.push(row[column] ?? null);
//                 }
//             }

//             const insertQuery = `
//           INSERT OR REPLACE INTO ${TN_ESTIMATIONS} (${columns.join(', ')})
//           VALUES ${placeholders};
//         `;
//             await db.executeSql(insertQuery, values);
//         }

//         return true;
//     } catch (error) {
//         console.error('estimation error:', error);
//         return false;
//     }
// };

// export const updateEstimations = async (estimations: string[]) => {
//     if (!estimations || estimations.length === 0) return false;

//     try {
//         const db = await getDBConnection();

//         const placeholders = estimations.map(() => '?').join(', ');

//         const updateQuery = `
//         UPDATE ${TN_ESTIMATIONS}
//         SET is_active = 1
//         WHERE uuid IN (${placeholders});
//       `;

//         await db.executeSql(updateQuery, estimations);

//         return true;
//     } catch (error) {
//         console.error('updateLeads error:', error);
//         return false;
//     }
// };

// export const getEstimationsDataForSync = async () => {
//     try {
//         const db = await getDBConnection();
//         const query = `SELECT * FROM ${TN_ESTIMATIONS} WHERE is_active = 0;`;

//         const results = await db.executeSql(query);

//         const tasks_form_data = results.flatMap(result =>
//             Array.from({ length: result.rows.length }, (_, index) => {
//                 const item = result.rows.item(index);
//                 return item;
//             })
//         );

//         await db.close();
//         console.log("leads list from mysqlite", tasks_form_data);

//         return tasks_form_data;
//     } catch (error) {
//         console.error("Error fetching leads list:", error);
//         return [];
//     }
// };

// export const updateEstimationItem = async (id: any, body = {}) => {
//     if (!id || Object.keys(body).length === 0) return false;

//     try {
//         const db = await getDBConnection();

//         const setClause = Object.keys(body)
//             .map(key => `${key} = ?`)
//             .join(', ');

//         const values = Object.values(body);

//         const updateQuery = `
//             UPDATE ${TN_ESTIMATIONS}
//             SET ${setClause}
//             WHERE uuid = ? OR id = ?;
//         `;

//         await db.executeSql(updateQuery, [...values, id, id]);
//         return true;

//     } catch (error) {
//         console.error('update estimation error:', error);
//         return false;
//     }
// };
