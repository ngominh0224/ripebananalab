require('../lib/models/associations');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/database');
const Studio = require('../lib/models/Studio');
const Film = require('../lib/models/Film');

const newFilm = {
  title: 'Jurassic Park',
  StudioId: 1,
  released: 1993,
  // cast: [
  //   {role: 'Dr. Grant', actor: 1},
  //   {role: 'Newman', actor: 2},
  // ]
};

const newStudio = {
  name: 'Alchemy',
  state: 'Oregon',
  country: 'United States',
};
const newStudio2 = {
  name: 'Warner Bros',
  state: 'California',
  country: 'United States',
};

describe('studios test', () => {
  beforeEach( async () => {
    await db.connectionManager.initPools()
    return await db.sync({ force: true });
  });

  afterAll( async () => {
    await db.close();
  })

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
    await Studio.create(newStudio);
    await Film.create(newFilm);
    const res = await request(app).get('/api/v1/studios/1');

    expect(res.body).toEqual({ 
      id: expect.any(Number),
      name: 'Alchemy',
      state: 'Oregon',
      country: 'United States',
      Films: [{  
        StudioId: 1,
        title: 'Jurassic Park',
        id: 1,
        released: 1993
      }]
     });
  });
  
  it('gets all studios', async ()=>{
    await Studio.create(newStudio);
    await Studio.create(newStudio2);

    const res = await request(app).get('/api/v1/studios');

    expect(res.body).toEqual([
      { id: expect.any(Number), ...newStudio },
      { id: expect.any(Number), ...newStudio2 },
    ]);
  });
});
