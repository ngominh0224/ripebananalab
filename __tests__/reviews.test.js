require('../lib/models/associations');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/database');
const Review = require('../lib/models/Review');
const Film = require('../lib/models/Film');


const { create } = require('../lib/models/Review');
const Reviewer = require('../lib/models/Reviewer');
const Studio = require('../lib/models/Studio');

const newFilm = {
  title: 'Jurassic Park',
  StudioId: 1,
  released: 1993,
  // cast: [
  //   {role: 'Dr. Grant', actor: 1},
  //   {role: 'Newman', actor: 2},
  // ]
};
const newFilm2 = {
  title: 'Ready Player One',
  StudioId: 1,
  released: 2018,
  // cast: [
  //   {role: 'Parzival', actor: 1},
  //   {role: 'Art3mis', actor: 2},
  // ]
};

const newStudio = {
  name: 'Alchemy',
  state: 'Oregon',
  country: 'United States',
};

const newReview = {
  rating: 3,
  review: 'Pretty good movie',
  FilmId: 1,
  ReviewerId: 1, 
};

const newReview2 = {
  rating: 5,
  review: 'I loved this movie',
  FilmId: 2,
  ReviewerId: 1, 
};

const newReviewer = {
  name: 'Bob Doe',
  company: 'IMDB',
}

describe('Review tests', () => {
  beforeEach( async () => {
    await db.connectionManager.initPools()
    return db.sync({ force: true });
  });
  
  afterAll( async () => {
    await db.close();
  })

  it('adds a new review to the db', async () => {
    await Studio.create(newStudio);
    await Film.create(newFilm);
    await Reviewer.create(newReviewer)
    
    return request(app)
    .post('/api/v1/reviews')
    .send(newReview)
    .then((res) => {
      expect(res.body).toEqual({ 
        id: expect.any(Number),
        ReviewerId: 1,
        rating: 3,
        review: 'Pretty good movie',
        FilmId: 1 });
    })
  });

  it('gets all reviews', async() => {
    await Studio.create(newStudio);
    await Film.create(newFilm);
    await Film.create(newFilm2);
    await Reviewer.create(newReviewer)
    await Review.bulkCreate([newReview, newReview2]);

    return request(app)
      .get('/api/v1/reviews')
      .then((res) => {
        expect(res.body).toEqual([
          { 
            id: expect.any(Number),
            ReviewerId: 1,
            rating: 3,
            review: 'Pretty good movie',
            FilmId: 1,
            Film: {
              id: 1,
              title: 'Jurassic Park',
            }
        },
        { 
          id: expect.any(Number),
          ReviewerId: 1,
          rating: 5,
          review: 'I loved this movie',
          FilmId: 2,
          Film: {
            id: 2,
            title: 'Ready Player One',
          }

      },
        ])
      })
  })

  it('deletes a review', async () => {
    await Studio.create(newStudio);
    await Film.create(newFilm);
    await Reviewer.create(newReviewer);
    await Review.create(newReview);
    
    return request(app)
      .delete('/api/v1/reviews/1')
      .then((res) => {
        expect(res.body).toEqual({success: 'deleted'})
      })
  })
});
