const db = require('../utils/database');
const { DataTypes, Model } = require('sequelize');

class Studio extends Model {}
Studio.init(
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: false,
    },
    country: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: false,
    },
  },
  { sequelize: db, timestamps: false, tableName: 'studios' }
);

module.exports = Studio;
