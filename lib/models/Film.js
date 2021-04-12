const db = require('../utils/database');
const {DataTypes, Model} = require('sequelize');

class Film extends Model {}
  Film.init({
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 2021,
        min: 1901
      }
    },

    
  },
  {sequelize: db, timestamps: false, tableName: 'films',}
  );

  module.exports = Film;
