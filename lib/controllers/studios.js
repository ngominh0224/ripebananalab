const { Router } = require('express');
const Studio = require('../models/Studio');
const Film = require('../models/Film');

module.exports = Router()
  .post('/', (req, res, next) => {
    Studio.create(req.body)
      .then((studio) => res.send(studio))
      .catch(next);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const data = await Studio.findByPk(req.params.id, 
        {
          include: 
          {model: Film,
          attibutes:['id, title'],},
        }
        );
      res.send(data);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req,res, next)=>{
    try {
      const data = await Studio.findAll()

      res.send(data)
    } catch (err) {
      next(err)
    }
  })
