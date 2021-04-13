const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const data = await Film.create(req.body, {
        include: {
          model: Studio,
          attributes: ['id'],
        },
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
