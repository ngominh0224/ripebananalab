const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/database');
const Review = require('../lib/models/Review');

const newReview = {
  rating: 3,
  review: 'Pretty good movie'
};

const newReview2 = {
  rating: 5,
  review: 'I loved this movie'
};

describe('Review tests', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });
  
  it('adds a new review to the db', () => {
    const newReview3 = {
      rating: 1,
      review: 'worst movie ever made'
    };

    return request(app)
      .post('/api/v1/reviews')
      .send(newReview3)
      .then((res) => {
        expect(res.body).toEqual({ id: expect.any(Number), ...newReview3});
      })
  });
});
