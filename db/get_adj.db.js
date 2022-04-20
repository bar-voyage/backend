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

const getAdjDb = async (bar_id) => {

    var query_txt = "SELECT adj.adj_name, describes.count FROM describes JOIN adj ON describes.adj_id = adj.adj_id WHERE describes.bar_id = " + bar_id + " ORDER BY describes.count DESC;";
    var result = await query(query_txt);
    var rows = JSON.parse(JSON.stringify(result));
    console.log(rows)

    return rows
  
};

module.exports = {
  getAdjDb,
};
