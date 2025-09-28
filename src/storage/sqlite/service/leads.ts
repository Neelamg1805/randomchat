// import { getDBConnection } from "..";
// import { TN_LEADS } from "../model/leads";



// export const saveMultipleLeadsInBatches = async (leads: any[]) => {
//   if (!leads || leads.length === 0) return false;

//   const BATCH_SIZE = 20;

//   try {
//     const db = await getDBConnection();

//     // Extract columns from the first lead assuming all leads share same structure
//     const columns = Object.keys(leads[0]);

//     for (let i = 0; i < leads.length; i += BATCH_SIZE) {
//       const batch = leads.slice(i, i + BATCH_SIZE);

//       const placeholders = batch
//         .map(() => `(${columns.map(() => '?').join(', ')})`)
//         .join(', ');

//       const values: any[] = [];
//       for (const row of batch) {
//         for (const column of columns) {
//           values.push(row[column] ?? null);
//         }
//       }

//       const insertQuery = `
//         INSERT OR REPLACE INTO ${TN_LEADS} (${columns.join(', ')})
//         VALUES ${placeholders};
//       `;

//       await db.executeSql(insertQuery, values);
//     }

//     return true;
//   } catch (error) {
//     console.error('saveMultipleLeadsInBatches error:', error);
//     return false;
//   }
// };

// export const getLeadByMobileNo = async (mobile_no: string) => {
//   if (!mobile_no) return null;

//   try {
//     const db = await getDBConnection();
//     const query = `SELECT * FROM ${TN_LEADS} WHERE MobileNo = ? LIMIT 1`;
//     const results = await db.executeSql(query, [mobile_no]);

//     const rows = results[0]?.rows;
//     if (rows.length > 0) {
//       return rows.item(0); // Return the first matched row
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error("getLeadByMobileNo error:", error);
//     return null;
//   }
// };

// export const getAllLeadsOffline = async (body: any) => {
//   try {
//     const db = await getDBConnection();

//     let query = `SELECT * FROM ${TN_LEADS} WHERE 1=1`;
//     const params: any[] = [];

//     if (body?.search) {
//       query += ` AND (CustomerName LIKE ? OR MobileNo LIKE ?)`;
//       const searchTerm = `%${body.search}%`;
//       params.push(searchTerm, searchTerm);
//     }

//     if (body?.project) {
//       query += ` AND Project = ?`;
//       params.push(body.project);
//     }

//     if (body?.category && body.category.toLowerCase() !== 'total') {
//       query += ` AND LOWER(category) = ?`;
//       params.push(body?.category?.toLowerCase());
//     }

//     query += ` ORDER BY createdAt DESC`;

//     const results = await db.executeSql(query, params);
//     const rows = results[0]?.rows;

//     const leads: any[] = [];
//     for (let i = 0; i < rows.length; i++) {
//       leads.push(rows.item(i));
//     }

//     return leads.length > 0 ? leads : null;
//   } catch (error) {
//     console.error("getAllLeadsOffline error:", error);
//     return null;
//   }
// };

// export const getLeadsCategoriesCountOffline = async (categoryName = "total") => {
//   try {
//     const db = await getDBConnection();
//     const query = `SELECT * FROM ${TN_LEADS}`;
//     const results = await db.executeSql(query, []);
//     const rows = results[0]?.rows;

//     let counts: any = {
//       total: 0,
//       hot: 0,
//       cold: 0,
//       warm: 0,
//       pending: 0,
//       lost: 0,
//       closed: 0
//     };

//     for (let i = 0; i < rows.length; i++) {
//       const lead = rows.item(i);
//       const category = lead.category?.toLowerCase();
//       counts.total += 1;

//       switch (category) {
//         case 'hot':
//           counts.hot += 1;
//           break;
//         case 'warm':
//           counts.warm += 1;
//           break;
//         case 'cold':
//           counts.cold += 1;
//           break;
//         case 'pending':
//           counts.pending += 1;
//           break;
//         case 'lost':
//           counts.lost += 1;
//           break;
//         case 'closed':
//           counts.closed += 1;
//           break;
//         default:
//           break;
//       }
//     }

//     const res = [
//       {
//         category_id: 0,
//         category_name: "Total",
//         count: !categoryName ? counts.total : counts[categoryName?.toLowerCase()],
//         bg_color: "#000080",
//         text_color: "#FFFFFF"
//       },
//       {
//         category_id: 1,
//         category_name: "Hot",
//         count: counts.hot,
//         bg_color: "#FF0000",
//         text_color: "#FFFFFF"
//       },
//       {
//         category_id: 2,
//         category_name: "Warm",
//         count: counts.warm,
//         bg_color: "#FFA500",
//         text_color: "#FFFFFF"
//       },
//       {
//         category_id: 3,
//         category_name: "Lost",
//         count: counts.lost,
//         bg_color: "#FFC7CE",
//         text_color: "#FFFFFF"
//       },
//       {
//         category_id: 4,
//         category_name: "Pending",
//         count: counts.pending,
//         bg_color: "#DE3163",
//         text_color: "#FFFFFF"
//       },
//       {
//         category_id: 5,
//         category_name: "Closed",
//         count: counts.closed,
//         bg_color: "#0BDA51",
//         text_color: "#FFFFFF"
//       },
//       {
//         category_id: 6,
//         category_name: "Cold",
//         count: counts.cold,
//         bg_color: "#0096FF",
//         text_color: "#FFFFFF"
//       }
//     ];

//     return res;
//   } catch (error) {
//     console.error("getLeadsCategoriesCountOffline error:", error);
//     return [];
//   }
// };

// export const updateLeads = async (leads: string[]) => {
//   if (!leads || leads.length === 0) return false;

//   try {
//     const db = await getDBConnection();

//     const placeholders = leads.map(() => '?').join(', ');

//     const updateQuery = `
//       UPDATE ${TN_LEADS}
//       SET is_active = 1
//       WHERE uuid IN (${placeholders});
//     `;

//     await db.executeSql(updateQuery, leads);

//     return true;
//   } catch (error) {
//     console.error('updateLeads error:', error);
//     return false;
//   }
// };

// export const updateLeadDetails = async (uuid: string, body = {}) => {
//   if (!uuid || Object.keys(body).length === 0) return false;

//   try {
//     const db = await getDBConnection();

//     const columns = Object.keys(body);
//     const setClause = columns.map(key => `${key} = ?`).join(', ');
//     const values = Object.values(body);

//     const updateQuery = `
//       UPDATE ${TN_LEADS}
//       SET ${setClause}
//       WHERE uuid = ?;
//     `;

//     await db.executeSql(updateQuery, [...values, uuid]);

//     return true;
//   } catch (error) {
//     console.error('updateLeadDetails error:', error);
//     return false;
//   }
// };

// export const getLeadsDataForSync = async () => {
//   try {
//     const db = await getDBConnection();
//     const query = `SELECT * FROM ${TN_LEADS} WHERE is_active = 0;`;

//     const results = await db.executeSql(query);

//     const tasks_form_data = results.flatMap(result =>
//       Array.from({ length: result.rows.length }, (_, index) => {
//         const item = result.rows.item(index);
//         return item;
//       })
//     );

//     await db.close();
//     return tasks_form_data;
//   } catch (error) {
//     console.error("Error fetching leads list:", error);
//     return [];
//   }
// };