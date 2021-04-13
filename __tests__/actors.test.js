require('../lib/models/associations');
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/database');
const Actor = require('../lib/models/Actor');
const Studio = require('../lib/models/Studio');
const Film = require('../lib/models/Film');

const newActor = {
  name: 'Bob Loblaw',
  dob: '1984-04-15',
  pob: 'Timbuktu',
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


const newStudio = {
  name: 'Alchemy',
  state: 'Oregon',
  country: 'United States',
};

describe('actor routes', () => {
  beforeEach( async () => {
    await db.connectionManager.initPools()
    return await db.sync({ force: true });
  });

  afterAll( async () => {
    await db.close();
  })

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
    await Actor.create(newActor);
    await Studio.create(newStudio);
    await Film.create(newFilm);

    const res = await request(app).get('/api/v1/actors/1');
    expect(res.body).toEqual({ 
      id: expect.any(Number),
      name: 'Bob Loblaw',
      dob: '1984-04-15',
      pob: 'Timbuktu',
      films: [{
        title: 'Jurassic Park',
        // StudioId: 1,
        released: 1993,
      }]
    });
  });

  it('get all actors array', async () => {
    const newActor2 = {
      name: 'Robert Loblaw',
      dob: '1984-04-15',
      pob: 'Timbuktu',
    };

    await Actor.bulkCreate([newActor, newActor2]);
    // Actor.create(newActor);
    // Actor.create(newActor2);

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
