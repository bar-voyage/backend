const config = require('../config')
const mysql = require("mysql");
const { query } = require('express');


var con = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
});

const registerUserDb = (email, password) => {
    //TODO: Should probably check that the user id is valid, that the categories are valid, etc
    //TODO: Better error responses
    
    query("INSERT INTO users (email, password) VALUES (" + email + ", " + password + ");")
    
    const newUserFound = query("SELECT COUNT(*) AS num_users FROM users WHERE email = \"" + email + "\" AND pass = \"" + password + "\";")
    if (newUserFound == 1) return 1
    else return 0
}

module.exports = {
    registerUserDb
}