const { application } = require("express");
const express = require("express");
const mysql = require("mysql");
const config = require("./config");
const routes = require('./routes');
const cors = require("cors");

var con = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
});
con.on('error', function(err){
    console.log(err)
})
const app = express();

app.use(cors({
    origin: '*'
}));

//app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`testing bar voyage db on port ${port}`);
});


app.use('/', routes) // routes is our routes file above

