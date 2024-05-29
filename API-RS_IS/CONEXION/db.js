const mysql = require("mysql2/promise"); // Importar la versión compatible con Promesas
const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = require("./constants");

const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
});

module.exports = db;