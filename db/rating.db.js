const config = require('../config')
const mysql = require("mysql");


var con = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
});

const ratingDb = (bar_id, stars) => {
    //TODO: Should probably check that the bar id is valid

    var query = "SELECT avg_stars, review_count FROM bar WHERE bar_id = " + bar_id + ";"
    con.query(query, function (err, result) {
        // TODO: Better error responses
        if (err) throw err;

        var rows = JSON.parse(JSON.stringify(result[0]));

        new_review_count = rows.review_count + 1
        console.log(rows.avg_stars)
        console.log(stars)
        console.log(new_review_count)
        new_avg_stars = (rows.avg_stars + stars) / new_review_count
        console.log(new_avg_stars)
        
        query = "UPDATE bar SET avg_stars = " + new_avg_stars + ", review_count = " + new_review_count + " WHERE bar_id = " + bar_id + ";"
        con.query(query, function (err, result) {
            // TODO: Better error responses
            if (err) throw err;
        })
    });
}

module.exports = {
    ratingDb
}