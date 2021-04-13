const { Router } = require('express');
const Actor = require('../models/Actor');
const Film = require('../models/Film');

module.exports = Router()
  .post('/', (req, res, next) => {
    Actor.create(req.body)
      .then((actor) => res.send(actor))
      .catch(next);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const data = await Actor.findByPk(req.params.id, {
        include: 
        { model: Film, attributes: ['id', 'title', 'released'] }
      });
      res.send(data);
    } catch (err) {
      next(err);
    }
  })

  .get('/', (req, res, next) => {
    Actor.findAll()
      .then((actors) => res.send(actors))
      .catch(next);
  });
