require('../lib/models/associations');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/database');
const Review = require('../lib/models/Review');

const { create } = require('../lib/models/Review');
const Reviewer = require('../lib/models/Reviewer');

const newReview = {
  rating: 3,
  review: 'Pretty good movie'
};

const newReview2 = {
  rating: 5,
  review: 'I loved this movie'
};

const newReviewer = {
  name: 'Bob Doe',
  company: 'IMDB',
}

describe.skip('Review tests', () => {
  beforeEach( async () => {
    await db.connectionManager.initPools()
    return db.sync({ force: true });
  });
  
  afterAll( async () => {
    await db.close();
  })

  it('adds a new review to the db', async () => {
    const reviewer = await Reviewer.create(newReviewer)
    
    const newReview3 = {
      rating: 1,
      review: 'worst movie ever made',
      ReviewerId: reviewer.id,
    };
    
    return request(app)
    .post('/api/v1/reviews')
    .send(newReview3)
    .then((res) => {
      expect(res.body).toEqual({ id: expect.any(Number), ...newReview3 });
      console.log(newReview3)
    })
  });

  it.skip('gets all reviews', async() => {
    await Review.bulkCreate([newReview, newReview2]);

    return request(app)
      .get('/api/v1/reviews')
      .then((res) => {
        expect(res.body).toEqual([
          { id: expect.any(Number), ...newReview },
          { id: expect.any(Number), ...newReview2 }
        ])
      })
  })

  it.skip('deletes a review', async () => {
    await Review.create(newReview);
    
    return request(app)
      .delete('/api/v1/reviews/1')
      .then((res) => {
        expect(res.body).toEqual({ })
      })
  })
});
