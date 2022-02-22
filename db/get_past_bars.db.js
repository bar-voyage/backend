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

const getPastBarsDb = async (user_id) => {
    query_txt = "SELECT bar.bar_id, bar.name, bar.address, bar.zip, bar.city, bar.state, bar.avg_stars FROM (users JOIN bar_history on users.user_id = bar_history.user_id JOIN bar ON bar_history.bar_id = bar.bar_id) WHERE users.user_id = " + user_id + ";";
    const rows = await query(query_txt)
    console.log(rows)
    return rows
}

module.exports = {
    getPastBarsDb
}
