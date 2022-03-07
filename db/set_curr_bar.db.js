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

const setCurrBarDb = async (user_id, bar_id) => {
    /* only one current bar available, so if there's already a current bar set for thie user, need to remove it before updating */
    var query_txt = "UPDATE bar_history SET current_bar = 0 WHERE user_id = " + user_id + " AND current_bar = 1;";
    var result = await query(query_txt);
    console.log(result)
    /* FIXME: need better error checking ^^ */
    query_txt = "INSERT bar_history (user_id, bar_id, current_bar) VALUES (" + user_id + ", " + bar_id + ", 1) ON DUPLICATE KEY UPDATE current_bar = 1;";
    return await query(query_txt)
}

module.exports = {
    setCurrBarDb
}
