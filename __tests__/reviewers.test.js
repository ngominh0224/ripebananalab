const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/database');
const Reviewer = require('../lib/models/Reviewer');

const newReviewer = {
  name: 'Bob Doe',
  company: 'IMDB',
};
const newReviewer2 = {
  name: 'Jane Lewis',
  company: 'Rotten Tomatoes',
};

describe('reviewers test', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('adds a new reviewer to the db', () => {
    const newReviewer2 = {
      name: 'Jane Lewis',
      company: 'Rotten Tomatoes',
    };

    return request(app)
      .post('/api/v1/reviewers')
      .send(newReviewer2)
      .then((res) => {
        expect(res.body).toEqual({ id: expect.any(Number), ...newReviewer2 });
      });
  });

  it('get reviewer by ID', async () => {
    await Reviewer.create(newReviewer);
    const res = await request(app).get('/api/v1/reviewers/1');

    expect(res.body).toEqual({ id: expect.any(Number), ...newReviewer });
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
