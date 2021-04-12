const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
  .post('/', (req, res, next) => {
    Reviewer.create(req.body)
      .then((reviewer) => res.send(reviewer))
      .catch(next);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const data = await Reviewer.findByPk(req.params.id, { include: Handle });
      res.send(data);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const data = await Reviewer.findAll();

      res.send(data);
    } catch (err) {
      next(err);
    }
  })

  .patch('/:id', (req, res, next) => {
    Reviewer.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    })
      .then((reviewer) => res.send(reviewer[1][0]))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Reviewer.destroy({
      where: { id: req.params.id },
    })
      .then(() => res.send({ success: 'Empty' }))
      .catch(next);
  });
