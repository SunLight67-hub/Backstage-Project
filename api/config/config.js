require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_ONEUPSALES_SERVING_LAYER_USERNAME,
    password: process.env.DB_ONEUPSALES_SERVING_LAYER_PASSWORD,
    database: process.env.DB_ONEUPSALES_SERVING_LAYER_NAME,
    host: process.env.DB_ONEUPSALES_SERVING_LAYER_HOST,
    dialect: 'postgres',
    logging: false,
  },
  uat: {},
  production: {},
};
