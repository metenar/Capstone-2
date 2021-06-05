/** Database setup for books api. */

const {Client} = require('pg');
const {getDatabaseUri, API_KEY}=require('./config');

const db=new Client({
    connectionString:getDatabaseUri(),
    API_KEY:API_KEY,
    ssl: {
        rejectUnauthorized: false,
      },
});
db.connect();
module.exports=db;