const fs = require('fs');
const s3_config = require('./s3_config')

const uploadFile = (path, type, fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(path);

    // Setting up S3 upload parameters
    const params = {
        Bucket: s3_config.bucket_name,
        Key: fileName, // File name you want to save as in S3
        Body: fileContent,
        ContentType: type
    };

    // Uploading files to the bucket
    s3_config.s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        // console.log(`File ${fileName} uploaded successfully. ${data.Location}`);
        // return data.Location
    });
};

module.exports = uploadFile;