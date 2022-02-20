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

const setContentViewDb = async (user_id, content_viewable) => {
    // "UPDATE bar SET avg_stars = " + new_avg_stars + ", review_count = " + new_review_count + " WHERE bar_id = \"" + bar_id + "\";"
    query_txt = "UPDATE users SET content_viewable = " + content_viewable + " WHERE user_id = " + user_id + ";"
    console.log(query_txt)
    return await query(query_txt)
}

module.exports = {
    setContentViewDb
}
