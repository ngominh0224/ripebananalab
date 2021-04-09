const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL); // Example for postgres

module.exports = sequelize;
