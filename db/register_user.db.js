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

const registerUserDb = async(email, password, fname, lname, age, gender) => {

    const existingUserFound = await query("SELECT COUNT(*) AS num_users FROM users WHERE email = \"" + email + "\" AND pass = \"" + password + "\";")
    if (existingUserFound[0].num_users != 0) return 0

    if(age < 21) {
        return 0;
    }
    if(age >= 21 && age <= 25) {
        age_range = "21-25";
    }
    else if(age > 25 && age <= 29) {
        age_range = "26-29";
    }
    else {
        age_range = "30+";
    }

    await query("INSERT INTO users (email, pass, fname, lname, age, gender) VALUES (\"" + email + "\", \"" + password + "\", \"" + fname + "\", \"" + lname + "\", \"" + age_range + "\", \"" + gender + "\");");
    
    const newUserFound = await query("SELECT COUNT(*) AS num_users FROM users WHERE email = \"" + email + "\" AND pass = \"" + password + "\";")
    if (newUserFound[0].num_users == 1) return 1
    else return 0
}

module.exports = {
    registerUserDb
}