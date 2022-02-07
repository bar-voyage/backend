const config = require('../config')
const mysql = require("mysql");
const util = require("util")

var con = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
});

const query = util.promisify(con.query).bind(con);

const getPhotosDb = async (bar_id) => {
    //TODO: Should probably check that the bar id is valid
    var query_txt = `SELECT * FROM content WHERE bar_id = ${bar_id};`;
    result = await query(query_txt)
    if(result.length <= 0) {
        return ["No images found"]
    }
    else {
        urls = []
        for(i = 0; i < result.length; i++) {
            urls[i] = result[i].content_url
        }
        return urls;
    }
}

module.exports = {
    getPhotosDb
}