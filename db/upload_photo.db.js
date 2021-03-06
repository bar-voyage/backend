const config = require('../config')
const mysql = require("mysql");
const s3Upload = require('../s3_upload')
const util = require('util')

const baseUrl = 'https://barvoyage-images.s3.amazonaws.com/'

var con = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
});

const query = util.promisify(con.query).bind(con);

const uploadPhotoDb = async (bar_id, user_id, photo, phototype, filename) => {
    //TODO: Should probably check that the bar id is valid
    
    var path = bar_id + '/' + filename
    var url = baseUrl + path
    var query_txt = `INSERT INTO content (bar_id, user_id, content_type, content_url) VALUES (${bar_id}, ${user_id}, 1, \'${url}\');`;
    
    //FIXME: make sure there's no error on these calls
    s3Upload(photo, path, phototype);    
    await query(query_txt)

    return 1;

}

module.exports = {
    uploadPhotoDb
}