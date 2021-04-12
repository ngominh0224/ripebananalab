const db = require('../utils/database');
const { DataTypes, Model } = require('sequelize');

class Reviewer extends Model {}
Reviewer.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { sequelize: db, timestamps: false, tableName: 'reviewers' }
);

module.exports = Reviewer;
