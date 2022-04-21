const pool = require("../db");
const md5 = require("md5");

const getUser = async (user, pass) => {
  try {
    const query = "select * FROM autorizados where username= ? and userpass = ?";
    const row = await pool.query(query, [user, md5(pass)]);
    return row[0];
  } catch (error) {
    console.log(error);
  }
  
  };

module.exports = { getUser };
