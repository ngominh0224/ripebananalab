const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false,
    },
    native: true,
  },
});

module.exports = sequelize;
