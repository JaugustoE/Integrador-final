const mysql = require("mysql");
const util = require("util");

const pool = mysql.createPool({
  conectionLimit: 10,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USERS,
  password: process.env.DB_PASS,
});
pool.query = util.promisify(pool.query);
module.exports = pool;
