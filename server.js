const { application } = require("express");
const express = require("express");
const mysql = require("mysql");
const config = require("./config");

const routes = require('./routes');


var con = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
});

const app = express();

app.use(express.json());
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`testing bar voyage db on port ${port}`);
});

app.use('/', routes) // routes is our routes file above

