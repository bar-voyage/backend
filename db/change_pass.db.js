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
    var check_user_query = "SELECT count(*) as num_users FROM users WHERE user_id = " + user_id + ";";
    var user_valid = await query(check_user_query);

    if (JSON.parse(JSON.stringify(user_valid[0].num_users)) != 1) {
        console.log("no user with this id");
        return -1;
    }
    var change_pass_query = 'UPDATE users SET pass = "' + new_pass + '" WHERE user_id = "' + user_id + '";';
    var change_pass_res = await query(change_pass_query);
    return change_pass_res;
}


module.exports = {
    changePassDB
}