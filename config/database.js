const logger = require('../config/logger')
const dotenv = require("dotenv").config();
const { Sequelize } = require("sequelize");

// const dbHost = dotenv.parsed.HOST;
// const dbDatabase = dotenv.parsed.DATABASE;
// const dbUser = dotenv.parsed.USER;
// const dbPassword = dotenv.parsed.PASSWORD;
// const dbDialect = dotenv.parsed.DIALECT;

const dbHost = "194.233.67.136";
const dbDatabase = "smartbottle";
const dbUser = "ms";
const dbPassword = "Ms@2021";
const dbDialect = "postgres";

logger.info(
  `Printing process env attributes : ${dbHost}, ${dbDatabase}, ${dbUser}, ${dbPassword},  ${dbDialect}`
);

let msHrms;

logger.info("Connecting to DB...");
msHrms = new Sequelize(dbDatabase, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
});

logger.info(`${dbDatabase} connected.`);

module.exports = msHrms;
