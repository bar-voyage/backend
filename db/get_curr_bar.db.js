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

const getCurrBarDb = async (user_id) => {
    /* only one current bar available, so if there's already a current bar set for thie user, need to remove it before updating */
    var query_txt = "SELECT bar.bar_id, bar.name FROM (users JOIN bar_history on users.user_id = bar_history.user_id JOIN bar ON bar_history.bar_id = bar.bar_id) WHERE bar_history.current_bar = 1 AND users.user_id = " + user_id + ";";
    var rows = await query(query_txt)
    console.log("getCurrBarDb", rows)
    return rows
}

module.exports = {
    getCurrBarDb
}
