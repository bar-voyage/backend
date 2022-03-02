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

const ratingDb = async (bar_id, stars) => {
    //TODO: Should probably check that the bar id is valid

    var query_txt = "SELECT avg_stars, review_count FROM bar WHERE bar_id = \"" + bar_id + "\";"
    console.log(query_txt)
    result = await query(query_txt);
    console.log(result)

    var rows = JSON.parse(JSON.stringify(result[0]));
    console.log(rows)

    new_review_count = rows.review_count + 1
    console.log(rows.avg_stars)
    console.log(stars)
    console.log(new_review_count)
    new_avg_stars = (rows.avg_stars + stars)*1.0 / new_review_count
    console.log("new average stars", new_avg_stars)
        
    query_txt2 = "UPDATE bar SET avg_stars = " + new_avg_stars + ", review_count = " + new_review_count + " WHERE bar_id = \"" + bar_id + "\";"
    result2 = query(query_txt2);
}

module.exports = {
    ratingDb
}