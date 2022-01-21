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

const allBarsDb = async () => {
    return await query("SELECT * FROM bar")
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
    allBarsDb
}