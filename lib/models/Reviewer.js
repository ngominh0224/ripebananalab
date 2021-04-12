const db = require('../utils/database');
const { DataTypes, Model } = require('sequelize');

class Reviewer extends Model {}
Reviewer.init(
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: false,
    },
    company: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: false,
    },
  },
  { sequelize: db, timestamps: false, tableName: 'reviewers' }
);

module.exports = Reviewer;
