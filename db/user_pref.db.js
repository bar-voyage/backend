const config = require('../config')
const mysql = require("mysql");


var con = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
});

const userPrefDb = (user_pref, user_id) => {
    //TODO: Should probably check that the user id is valid, that the categories are valid, etc
    //TODO: Better error responses
    for (i = 0; i < user_pref.length; i++) {
        var query = "SELECT category_id FROM category WHERE category_name = \"" + user_pref[i] + "\";"
        con.query(query, function (err, result) {
            // TODO: Better error responses
            if (err) throw err;

            var rows = JSON.parse(JSON.stringify(result[0]));
            query = "INSERT IGNORE INTO user_pref (user_id, category_id) VALUES (" + user_id + ", " + rows.category_id + ");"
            con.query(query, function (err, result) {
                // TODO: Better error responses
                if (err) throw err;
            })
        });
    }
}

module.exports = {
    userPrefDb
}