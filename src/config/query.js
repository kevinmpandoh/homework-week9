var Pool = require('pg').Pool;
var pool = new Pool({
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

module.exports = pool;
