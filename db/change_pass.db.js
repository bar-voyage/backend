const config = require('../config')
const mysql = require("mysql");
const util = require('util');
const { send } = require('process');



var con = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
});

const query = util.promisify(con.query).bind(con);

const changePassDB = async (user_id, new_pass) => {
    // return await query("SELECT * FROM bar")
    var check_user_query = 'SELECT user_id FROM users WHERE user_id = "' + user_id + '";';
    var user_valid = await query(check_user_query);
    if (JSON.parse(JSON.stringify(user_valid[0])) != 1){
        console.log("no user with this id");
        return send(500);
    }
    var change_pass_query = 'UPDATE users SET password = "' + new_pass + '" WHERE user_id = "' + user_id + '";';
    var change_pass_res = await query(change_pass_query);
    return change_pass_res;
}


module.exports = {
    changePassDB
}