const db = require('../utils/database');
const { DataTypes, Model } = require('sequelize');

class Actor extends Model {}
    Actor.init({
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            unique: false,
        },
        pob: {
            type: DataTypes.TEXT,
            allowNull: true,
            unique: false,
        },
    }, 
    { sequelize: db, timestamps: false, tableName: 'actors', }
    );

module.exports = Actor;
