const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/database');
const Film = require('../lib/models/Film');

const newFilm = {
  title: 'Jurassic Park',
  studio: 'Paramount',
  released: 1993,
  // cast: [
  //   {role: 'Dr. Grant', actor: 1},
  //   {role: 'Newman', actor: 2},
  // ]
}

const newFilm2 = {
  title: 'Ready Player One',
  // studio: 'Paramount',
  released: 2018,
  // cast: [
  //   {role: 'Parzival', actor: 1},
  //   {role: 'Art3mis', actor: 2},
  // ]
}


describe('film routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  })

  it('add a new film to the db', async () => {
    const data = await request(app)
    .post('/api/v1/films')
    .send(newFilm2)
    expect(data.body).toEqual({ id: expect.any(Number), ...newFilm2 });
  });

  it('gets a film by id', async () => {
    await Film.create(newFilm2)
    const data = await request(app)
    .get('/api/v1/films/1')
    expect(data.body).toEqual({ id: expect.any(Number), ...newFilm2 });
  });

  it('gets all films', async () => {
    await Film.create(newFilm)
    await Film.create(newFilm2)
    const data = await request(app)
    .get('/api/v1/films')
    expect(data.body).toEqual({ id: expect.any(Number), ...newFilm },{ id: expect.any(Number), ...newFilm2 });
  });

})
