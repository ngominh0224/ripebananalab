const Reviewer = require('./Reviewer');
const Review = require('./Review');
const Film = require('./Film');
const Studio = require('./Studio');

Reviewer.hasMany(Review);
Review.belongsTo(Reviewer);
Studio.hasMany(Film);
Film.belongsTo(Studio);
Film.hasMany(Review);
Review.belongsTo(Film);