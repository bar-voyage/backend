const fs = require('fs');
const s3_config = require('./s3_config')
// const Buffer = require('buffer')

const uploadFile = (photo_base64, filename, phototype) => {
    // Read content from the file
    buf = Buffer.from(photo_base64.replace(/^data:image\/\w+;base64,/, ""),'base64')

    // Setting up S3 upload parameters
    const params = {
        Bucket: s3_config.bucket_name,
        Key: filename, // File name you want to save as in S3
        Body: buf,
        ContentEncoding: 'base64',
        ContentType: phototype
    };

    // Uploading files to the bucket
    s3_config.s3.upload(params, function(err, data) {
        console.log(params);
        if (err) {
            throw err;
        }
    });
};

module.exports = uploadFile;