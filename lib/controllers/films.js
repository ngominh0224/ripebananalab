const {Router} = require('express');
const Film = require('../models/Film')

module.exports = Router()
.post('/', async (req, res, next) =>{
  try {
    const data = await Film.create(req.body)
    res.send(data)
  } catch (err) {
    next(err)
  }
})