const db = require('../utils/database');
const { DataTypes, Model } = require('sequelize');

class Actor extends Model {}
    Actor.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            unique: false,
        },
        pob: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        },
    }, 
    { sequelize: db, timestamps: false, tableName: 'actors', ssl: { rejectUnauthorized: false } }
    );

module.exports = Actor;
