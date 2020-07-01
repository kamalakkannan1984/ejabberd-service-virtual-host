import sql from 'mssql';
import mysql from 'mysql';

/**
 * mssql connection config
 */
const sqlConfig = {
  user: 'smepbx',
  password: 'smeswitch',
  server: '10.22.2.86',
  database: 'unifiedring',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
};

/**
 * Mssql pool connection
 */
export const mssqlPoolConnection = new sql.ConnectionPool('mssql://smepbx:smeswitch@10.22.2.86/unifiedring');

/**
 * Mysql pool connection
 */
export const mysqlPoolConnection = mysql.createPool({
  connectionLimit: 10,
  host: '82.113.74.51',
  user: 'ejabberd',
  password: 'Vicarage@2019',
  database: 'ejabberd',
});
