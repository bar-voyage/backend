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

const getContentViewDb = async (user_id) => {
    // "UPDATE bar SET avg_stars = " + new_avg_stars + ", review_count = " + new_review_count + " WHERE bar_id = \"" + bar_id + "\";"
    query_txt = "SELECT content_viewable FROM users WHERE user_id = " + user_id + ";"
    console.log(query_txt)
    const rows = await query(query_txt)
    console.log(rows[0].content_viewable)
    return rows[0].content_viewable
}

module.exports = {
    getContentViewDb
}
