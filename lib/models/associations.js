const Reviewer = require('./Review');
const Review = require('./Review');

Reviewer.hasMany(Review);
Review.belongsTo(Reviewer);
