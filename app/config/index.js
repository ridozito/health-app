'use strict';

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  secret: process.env.SECRET,
  database: {
    mysql: {
      host: process.env.DB_MYSQL_HOST,
      port: process.env.DB_MYSQL_PORT,
      username: process.env.DB_MYSQL_USER,
      password: process.env.DB_MYSQL_PASSWD,
      name: process.env.DB_MYSQL_NAME,
      timezone: process.env.DB_MYSQL_TIMEZONE
    }
  }
  
}