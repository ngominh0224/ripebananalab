require('../lib/models/associations');
const db = require('../lib/utils/database');
const request = require('supertest');
const app = require('../lib/app');
const Reviewer = require('../lib/models/Reviewer');
const Review = require('../lib/models/Review');
const Film = require('../lib/models/Film');
const Studio = require('../lib/models/Studio');

const newReviewer = {
  name: 'Bob Doe',
  company: 'IMDB',
};

const newReviewer2 = {
  name: 'Jane Lewis',
  company: 'Rotten Tomatoes',
};

const newFilm = {
  title: 'Jurassic Park',
  StudioId: 1,
  released: 1993,
  // cast: [
  //   {role: 'Dr. Grant', actor: 1},
  //   {role: 'Newman', actor: 2},
  // ]
};

const newReview = {
  rating: 3,
  review: 'Pretty good movie',
  FilmId: 1,
  ReviewerId: 1, 
};

const newStudio = {
  name: 'Alchemy',
  state: 'Oregon',
  country: 'United States',
};

describe('reviewers test', () => {
  beforeEach(async () => {
    await db.connectionManager.initPools();
    return await db.sync({ force: true });
  });

  afterAll(async () => {
    await db.close();
  });

  it('adds a new reviewer to the db', () => {
    const newReviewer3 = {
      name: 'Jane Lewis',
      company: 'Rotten Tomatoes',
    };

    return request(app)
      .post('/api/v1/reviewers')
      .send(newReviewer3)
      .then((res) => {
        expect(res.body).toEqual({ id: expect.any(Number), ...newReviewer3 });
      });
  });

  it('get reviewer by ID', async () => {
    await Studio.create(newStudio);
    const newTestFilm = await Film.create(newFilm);
    await Reviewer.create(newReviewer);

    const newTestReview = await Review.create(newReview);

    const res = await request(app).get('/api/v1/reviewers/1');

    expect(res.body).toEqual({
      id: expect.any(Number),
      name: 'Bob Doe',
      company: 'IMDB',
      Reviews: [
        {
          id: newTestReview.id,
          rating: newTestReview.rating,
          review: newTestReview.review,
          Film: {
            id: newTestFilm.id, 
            title: newTestFilm.title},
        },
      ],
    });
  });

  it('gets all reviewers', async () => {
    await Reviewer.create(newReviewer);
    await Reviewer.create(newReviewer2);

    const res = await request(app).get('/api/v1/reviewers');

    expect(res.body).toEqual([
      { id: expect.any(Number), ...newReviewer },
      { id: expect.any(Number), ...newReviewer2 },
    ]);
  });

  it('updates a Reviewer', async () => {
    await Reviewer.create({
      name: 'Bob Doe',
      company: 'IMDB',
    });

    return request(app)
      .patch('/api/v1/reviewers/1')
      .send({ company: 'Yelp' })
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: 'Bob Doe',
          company: 'Yelp',
        });
      });
  });

  it('deletes a Reviewer', async () => {
    await Reviewer.create({
      name: 'Bob Doe',
      company: 'IMDB',
    });
    return request(app)
      .delete('/api/v1/reviewers/1')
      .then((res) => {
        expect(res.body).toEqual({ success: 'Empty' });
      });
  });
});
