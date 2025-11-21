require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME || "postgres",
    "password": process.env.DB_PASSWORD || "password",
    "database": process.env.DB_NAME || "portofoliokudb",
    "host": process.env.DB_HOST || "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_USERNAME || "postgres",
    "password": process.env.DB_PASSWORD || "password",
    "database": process.env.DB_NAME || "portofolio_test",
    "host": process.env.DB_HOST || "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DB_USERNAME || "postgres",
    "password": process.env.DB_PASSWORD || "password",
    "database": process.env.DB_NAME || "portofolio_production",
    "host": process.env.DB_HOST || "127.0.0.1",
    "dialect": "postgres"
  }
};
