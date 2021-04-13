const { Router } = require('express');
const Film = require('../models/Film');
const Review = require('../models/Review');
const Reviewer = require('../models/Reviewer');



module.exports = Router()
    .post('/', (req, res, next) => {
        Review.create(req.body)
            .then((review) => res.send(review), 
            {include: 
                {
                model: Film,
                attributes: ['id'],
                },
            }
            )
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Review.findAll({include: Reviewer})
            .then((review) => res.send(review),
            {include: 
                {
                model: Film,
                attributes: ['id', 'title'],
                },
            }
            )
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Review.destroy({where:{id:req.params.id}})
            .then(() => res.send({success: 'deleted'}))
            .catch(next);
    })
