require('../lib/models/associations');
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/database');
const Film = require('../lib/models/Film');
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');

const newFilm = {
  title: 'Jurassic Park',
  StudioId: 1,
  released: 1993,
  cast: [
    {role: 'Dr. Grant', actor: 1},
  ]
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

const newActor = {
  name: 'Bob Loblaw',
  dob: '1984-04-15',
  pob: 'Timbuktu',
};

const newStudio2 = {
  name: 'Warner Bros',
  state: 'California',
  country: 'United States',
};

describe('film routes', () => {
  beforeEach(async () => {
    await db.connectionManager.initPools();
    return await db.sync({ force: true });
  });

  afterAll(async () => {
    await db.close();
  });

  it('add a new film to the db', async () => {
    await Studio.create(newStudio);
    const newTestActor = await Actor.create(newActor);

    const data = await request(app).post('/api/v1/films').send(newFilm);

    expect(data.body).toEqual({ 
      id: expect.any(Number),
      title: 'Jurassic Park',
      StudioId: 1,
      released: 1993,
      cast: [{
        'id': 1,
        'role': 'Dr. Grant', 
        actor: {
          id: newTestActor.id,
          name: newTestActor.name,}
        }]
       });
  });

  it('gets a film by id', async () => {
    await Film.create(newFilm2);
    const data = await request(app).get('/api/v1/films/1');
    expect(data.body).toEqual({ id: expect.any(Number), ...newFilm2 });
  });

  it('gets all films', async () => {
    await Studio.create(newStudio);
    await Film.create(newFilm);
    await Film.create(newFilm2);

    const data = await request(app).get('/api/v1/films');

    expect(data.body).toEqual([
      { StudioId: 1,
        id: expect.any(Number), 
        title: 'Jurassic Park',
        Studio: {id:1, name: 'Alchemy'},
        released: 1993,},
      { StudioId: 1,
        id: expect.any(Number),
        title: 'Ready Player One',
        Studio: {id: 1, name: 'Alchemy'},
        released: 2018,},
    ]);
  });
});
