const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/database');
const Studio = require('../lib/models/Studio');

const newStudio = {
  name: 'Alchemy',
  state: 'Oregon',
  country: 'United States',
};

describe('studios test', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('adds a new studio to the db', () => {
    const newStudio2 = {
      name: 'Fox Studio',
      state: 'Oregon',
      country: 'United States',
    };

    return request(app)
      .post('/api/v1/studios')
      .send(newStudio2)
      .then((res) => {
        expect(res.body).toEqual({ id: expect.any(Number), ...newStudio2 });
      });
  });

  it('get studio by ID', async () => {
    Studio.create(newStudio);
    const res = await request(app).get('/api/v1/studios/1');

    expect(res.body).toEqual({ id: expect.any(Number), ...newStudio });
  });
});
