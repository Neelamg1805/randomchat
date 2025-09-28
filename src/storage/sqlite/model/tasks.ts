export const TN_TASK_DATA = 'tasks';

export const createTableQureyTaks = `CREATE TABLE IF NOT EXISTS ${TN_TASK_DATA} (
  uuid TEXT PRIMARY KEY,
  id INTEGER UNIQUE,
  data TEXT NOT NULL,
  is_active BOOLEAN DEFAULT 1
);
`

export const TN_TASK_FORM_DATA = 'tasks_form_data';

export const createTableQureyTaksFormData = `CREATE TABLE IF NOT EXISTS ${TN_TASK_FORM_DATA} (
  uuid TEXT PRIMARY KEY,
  id INTEGER UNIQUE,
  data TEXT NOT NULL,
  is_active BOOLEAN DEFAULT 1
);
`