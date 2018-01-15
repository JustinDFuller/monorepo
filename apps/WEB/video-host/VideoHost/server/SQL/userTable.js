require('dotenv').config();
const query = require('./../Util/DatabaseHandler').runQuery;

function createUserTable() {
  return query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email varchar(250) UNIQUE NOT NULL,
    password varchar(250) NOT NULL,
    firstname varchar(250),
    lastname varchar(250),
    facebookid varchar UNIQUE,
    googleid varchar UNIQUE,
    twitterid varchar UNIQUE
  )`)
    .then(res => console.log(res))
    .catch(err => console.error(err));
}

module.exports = createUserTable();
