const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/database');
const Actor = require('../lib/models/Actor');

const newActor = {
  name: 'Bob Loblaw',
  dob: '1984-04-15',
  pob: 'Timbuktu',
};

describe('ripebanana routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('adds a new actor to the db', () => {
    const newActor2 = {
      name: 'Robert Loblaw',
      dob: '1984-04-15',
      pob: 'Timbuktu',
    };

    return request(app)
      .post('/api/v1/actors')
      .send(newActor2)
      .then((res) => {
        expect(res.body).toEqual({ id: expect.any(Number), ...newActor2 });
      });
  });
  it('get actor by ID', async () => {
    Actor.create(newActor);
    const res = await request(app).get('/api/v1/actors/1');
    expect(res.body).toEqual({ id: expect.any(Number), ...newActor });
  });

  it('get all actors array', () => {
    const newActor2 = {
      name: 'Robert Loblaw',
      dob: '1984-04-15',
      pob: 'Timbuktu',
    };

    Actor.create(newActor);
    Actor.create(newActor2);

    return request(app)
      .get('/api/v1/actors')
      .then((res) => {
        expect(res.body).toEqual([
          { id: expect.any(Number), ...newActor },
          { id: expect.any(Number), ...newActor2 },
        ]);
      });
  });
});
