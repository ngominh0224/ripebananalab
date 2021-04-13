const { Router } = require('express');
const Actor = require('../models/Actor');
const Film = require('../models/Film');
const Studio = require('../models/Studio');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const data = await Film.create(req.body, {
        include: [{
          model: Studio,
          attributes: ['id'],
        },
        {
          model: Actor,
          attributes: ['id'],
        }]
      });
      res.send(data);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Film.findByPk(req.params.id);
      res.send(data);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const data = await Film.findAll({
        include: {
          model: Studio,
          attributes: ['id', 'name'],
        },
      });
      res.send(data);
    } catch (err) {
      next(err);
    }
  });
