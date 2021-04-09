const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/database');

describe('ripebanana routes', () => {
  beforeEach(() => {
    return db.sync({force:true});
  });


  it('adds a new actor to the db', () => {
    const newActor = {
      name: 'Bob Loblaw',
      dob: '1984-04-15',
      pob: 'Timbuktu'
    }

    return request(app)
      .post('/api/v1/actors')
      .send(newActor)
      .then((res) => {
        expect(res.body).toEqual({id: 1, ...newActor});
      })
  })
});
