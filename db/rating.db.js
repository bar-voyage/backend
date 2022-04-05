const config = require('../config')
const mysql = require("mysql");
const util = require("util")


var con = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
});
con.connect();
con.on('error', function(err){
    console.log(err)
});

const query = util.promisify(con.query).bind(con);

const ratingDb = async (bar_id, stars, user_id) => {
    console.log("in rating db");
    // stars = 4;
    console.log("stars form user: " + stars)
    // is there an existing rating? if yes, update it to be an average 
    var rating_table_get = "SELECT num_rates, stars FROM ratings WHERE bar_id=\""+ bar_id +"\" AND user_id=\"" + user_id + "\";" 
    // console.log(rating_table_get)
    rates = await query(rating_table_get)
    // console.log("result rates = " + rates)
    // if (rates == ) console.log("unsucessful sql query")
    if (rates > 0){
        // calculate avg
        console.log("rating exists")
        num_user_ratings = rates[0].num_rates + 1
        new_avg_user_rating = (rates[0].stars + stars)*1.0/(num_user_ratings)
        console.log("new user rating avg: " + new_avg_user_rating)
        var rating_update_query = "UPDATE ratings SET num_rates=\"" +num_user_ratings+ "\", stars=\"" +new_avg_user_rating+ "\" WHERE user_id=\"" + user_id + "\" AND bar_id=\"" + bar_id + "\";"
        update_query_result = await query(rating_update_query);
        if (update_query_result != 1){
            // unsuccessful update 
            console.log("an error occurred while updating rating in table")
        }
    } 
    else {
        num_user_ratings = 1
        var rating_table_query = "INSERT INTO ratings (bar_id, stars, user_id, num_rates) VALUES (\"" + bar_id + "\", \"" + stars + "\", \"" + user_id + "\", \"" + num_user_ratings + "\");"
        // console.log(rating_table_query)
        result0 = await query(rating_table_query);
        console.log("added to rating table:" + result0) 
        if (result0 != 1){
            // unsuccessful insert
            console.log("an error ocurred while inserting rating into table")
        }
    }

    //TODO: Should probably check that the bar id is valid

    var query_txt = "SELECT avg_stars, review_count FROM bar WHERE bar_id = \"" + bar_id + "\";"
    console.log(query_txt)
    result = await query(query_txt);
    console.log(result)

    var rows = JSON.parse(JSON.stringify(result[0]));
    console.log(rows)

    new_review_count = rows.review_count + 1
    console.log(rows.avg_stars)
    console.log("stars: " + stars)
    console.log("new rev count: " + new_review_count)
    new_avg_stars = (rows.avg_stars + stars)*1.0 / new_review_count
    console.log("new average stars: ", new_avg_stars)
        
    query_txt2 = "UPDATE bar SET avg_stars = " + new_avg_stars + ", review_count = " + new_review_count + " WHERE bar_id = \"" + bar_id + "\";"
    result2 = await query(query_txt2);
    //con.end()
}

module.exports = {
    ratingDb
}