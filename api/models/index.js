'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const { resourceType, message } = require('../constants/logger_constants');
const { writeJson } = require('../../writer');
const db = {};

const sequelize = new Sequelize(
  process.env.DB_ONEUPSALES_SERVING_LAYER_NAME,
  process.env.DB_ONEUPSALES_SERVING_LAYER_USERNAME,
  process.env.DB_ONEUPSALES_SERVING_LAYER_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DB_ONEUPSALES_SERVING_LAYER_HOST,
    port: process.env.SERVING_LAYER_DB_PORT,
  },
);

// Log relevant environment variables
console.log({
  resourceType: resourceType.posService,
  message: `Connecting to database with the following configurations:`,
  databaseName: process.env.DB_ONEUPSALES_SERVING_LAYER_NAME,
  username: process.env.DB_ONEUPSALES_SERVING_LAYER_USERNAME,
  host: process.env.DB_ONEUPSALES_SERVING_LAYER_HOST,
  port: process.env.SERVING_LAYER_DB_PORT,
  environment: process.env.NODE_ENV,
});

sequelize
  .authenticate()
  .then(() => {
    console.log({
      resourceType: resourceType.posService,
      message: `Connected to ${process.env.DB_ONEUPSALES_SERVING_LAYER_NAME } users DB Succesfully`,
    });
    console.log({
      resourceType: resourceType.posService,
      message: `Environment: ${process.env.NODE_ENV}`,
    });
    console.log({
      resourceType: resourceType.posService,
      message: 'users DB connection has been established successfully.',
    });
  })
  .catch(err => {
    writeJson(err, {
      resourceType: resourceType.posService,
      message: 'Failed to connect users DB',
    }, 500);
  });

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
