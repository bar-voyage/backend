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

const recBarsDb = async (user_id) => {
    query_txt = "SELECT * FROM (bar JOIN bar_type ON bar.bar_id = bar_type.bar_id JOIN user_pref ON bar_type.category_id = user_pref.category_id) WHERE user_pref.user_id = " + user_id + ";"
    return await query(query_txt);
}

/* from https://stackoverflow.com/questions/44004418/node-js-async-await-using-with-mysql 
(async () => {
    try {
      const rows = await query('select count(*) as count from file_managed');
      console.log(rows);
    } finally {
      con.end();
    }
  })()

*/

module.exports = {
    recBarsDb
}