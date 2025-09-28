export const TN_MASTER_DATA = 'master_data';

export const createTableQureyMasterData = `CREATE TABLE IF NOT EXISTS ${TN_MASTER_DATA} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  data_key TEXT NOT NULL,
  data TEXT NOT NULL
);`