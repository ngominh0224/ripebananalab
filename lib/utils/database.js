const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize(process.env.DATABASE_URL); 
const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres', protocol: 'postgres', dialectOptions: { 
  ssl: { require: true, native: true, rejectUnauthorized: false, }, }, }); 

module.exports = sequelize;
