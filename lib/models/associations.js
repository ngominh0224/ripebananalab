const Reviewer = require('./Reviewer');
const Review = require('./Review');
const Film = require('./Film');
const Studio = require('./Studio');
const Actor = require('./Actor');

Reviewer.hasMany(Review);
Review.belongsTo(Reviewer);

Studio.hasMany(Film);
Film.belongsTo(Studio);

Film.hasMany(Review);
Review.belongsTo(Film);

Film.belongsToMany(Reviewer, {through: 'ReviewerFilm'});
Reviewer.belongsToMany(Film, {through: 'ReviewerFilm'});

Film.belongsToMany(Actor, {through: 'Cast'});
Actor.belongsToMany(Film, {through: 'Cast'});
