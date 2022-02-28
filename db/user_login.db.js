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
    const rows = await query("SELECT user_id, fname, lname FROM users WHERE email = \"" + email + "\" AND pass = \"" + password + "\";")
    if(rows.length != 1) return 0
    else return rows[0]
}

module.exports = {
    userLoginDb
}