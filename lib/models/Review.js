const db = require('../utils/database');
const { DataTypes, Model } = require('sequelize');

class Review extends Model {}
    Review.init({
        rating: {
            type: DataTypes.INTEGER,
            // validate: {
            //     min: 1,
            //     max: 5,
            // },
            allowNull: false,
            unique: false,
        },
        review: {
            type: DataTypes.TEXT,
            // validate: { 
            //     len: [1,140],
            // },
            allowNull: false,
            unique: false,
        },   
    },
    { sequelize: db, timestamps: false, tableName: 'reviews' }
    );

    module.exports = Review;
