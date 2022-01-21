const config = require('../config')
const mysql = require("mysql");
const util = require('util');



var con = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
});

const query = util.promisify(con.query).bind(con);

const userLoginDb = async (email, password) => {
    console.log("SELECT COUNT(*) AS num_users FROM users WHERE email = \"" + email + "\" AND pass = \"" + password + "\";")
    const rows = await query("SELECT COUNT(*) AS num_users FROM users WHERE email = \"" + email + "\" AND pass = \"" + password + "\";")
    console.log(rows[0].num_users)
    if (rows[0].num_users == 1) return 1
    else return 0
}

module.exports = {
    userLoginDb
}