const env = require('dotenv').config();
const Keyv = require('keyv');
const keyv = new Keyv();
/*
const keyv = new Keyv('postgresql://'
            + process.env.DB_USER
            + ':' + process.env.DB_PASSWORD
            + '@' + process.env.DB_HOST
            + ':' + process.env.DB_PORT
            + '/' + process.env.DB_NAME);
            */

keyv.on('error', err => console.log('Connection Error', err));
module.exports = keyv;