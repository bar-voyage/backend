const config = require("../config");
const mysql = require("mysql");
const util = require("util");

var con = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

const query = util.promisify(con.query).bind(con);

const setAdjDb = async (bar_id, adj_list) => {
  //TODO: Should probably check that the bar id is valid, that the categories are valid, etc
  //TODO: Better error responses
  
  for (i = 0; i < adj_list.length; i++) {
    var text =
      'SELECT adj_id FROM adj WHERE adj_name = "' + adj_list[i] + '";';
    var result = await query(text);
    var rows = JSON.parse(JSON.stringify(result[0]));
    
    var query_txt = "INSERT describes (bar_id, adj_id, count) VALUES (" + bar_id + ", " + rows.adj_id + ", 1) ON DUPLICATE KEY UPDATE count = count + 1;";
    await query(query_txt);
  }
};

module.exports = {
  setAdjDb,
};
