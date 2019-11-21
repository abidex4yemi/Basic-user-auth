require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
  },
  test: {
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB,
    host: process.env.TEST_DB_HOST,
    port: process.env.TEST_DB_HOST,
    username: process.env.TEST_DB_USERNAME,
    url: process.env.TEST_DB,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    url: process.env.DATABASE_URL_1,
    dialect: 'postgres',
  },
};
