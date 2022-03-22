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
    var query_txt = "SELECT bar_id FROM bar_history WHERE current_bar = 1 AND user_id = " + user_id + ";";
    var rows = await query(query_txt);
    console.log(rows[0].bar_id)
    return rows[0].bar_id
}

module.exports = {
    getCurrBarDb
}
