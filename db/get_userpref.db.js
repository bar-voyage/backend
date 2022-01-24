// const config = require('../config')
// const mysql = require("mysql");


// var con = mysql.createConnection({
//     host: config.db.host,
//     user: config.db.user,
//     password: config.db.password,
//     database: config.db.database,
// });

// const getUserPrefDb = async(user_id) => {
//     //TODO: Should probably check that the user id is valid, that the categories are valid, etc
//     //TODO: Better error responses
//     var query = "SELECT category_id FROM user_pref WHERE user_id = " + user_id + ";"
//     var rows;
//     await con.query(query, function (err, result) {
//         // TODO: Better error responses
//         if (err) throw err;
//         rows = JSON.parse(JSON.stringify(result[0]));
//         console.log(rows)
//     });
//     var data = [];
//     for(var bar in rows)
//         data.push(rows[bar]);
//     console.log(data)
        
//     return [1,2];
// }

// module.exports = {
//     getUserPrefDb
// }