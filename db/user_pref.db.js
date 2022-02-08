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

const userPrefDb = async (user_pref, user_id) => {
  //TODO: Should probably check that the user id is valid, that the categories are valid, etc
  //TODO: Better error responses
  console.log("user_pref", user_pref);
  for (i = 0; i < user_pref.length; i++) {
    var text =
      'SELECT category_id FROM category WHERE category_name = "' + user_pref[i] + '";';
    var result = await query(text);
    var rows = JSON.parse(JSON.stringify(result[0]));
    text =
        "INSERT IGNORE INTO user_pref (user_id, category_id) VALUES (" +
        user_id +
        ", " +
        rows.category_id +
        ");";
      await query(text);
  }
};

module.exports = {
  userPrefDb,
};
