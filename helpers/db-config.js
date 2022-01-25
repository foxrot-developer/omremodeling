require('dotenv').config();
const mysql = require('mysql');

const db = mysql.createPool({
    host: process.env.DB_HOST_FREE,
    port: process.env.DB_PORT,
    user: process.env.DB_USER_FREE,
    password: process.env.DB_PASSWORD_FREE,
    database: process.env.DB_NAME_FREE
});

module.exports = db;