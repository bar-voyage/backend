require('dotenv').config()
const AWS = require('aws-sdk');
const env = process.env;

// Enter copied or downloaded access ID and secret key here
const ID = env.S3_ACCESS_KEY_ID;
const SECRET = env.S3_SECRET_ACCESS_KEY;

// The name of the bucket that you have created
const BUCKET_NAME = env.S3_BUCKET_NAME;

const s3_aws = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
    })

const s3_config = {
    s3: s3_aws,
    bucket_name: BUCKET_NAME
};

module.exports = s3_config;