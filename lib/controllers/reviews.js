const { Router } = require('express');
const Review = require('../models/Review');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
    .post('/', (req, res, next) => {
        Review.create(req.body)
            .then((review) => res.send(review))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Review.findAll({include: Reviewer})
            .then((review) => res.send(review))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Review.destroy({where:{id:req.params.id}})
            .then((review) => res.send(review))
            .catch(next);
    })
