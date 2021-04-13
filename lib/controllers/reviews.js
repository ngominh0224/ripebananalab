const { Router } = require('express');
const Film = require('../models/Film');
const Review = require('../models/Review');
const Reviewer = require('../models/Reviewer');



module.exports = Router()
    .post('/', (req, res, next) => {
        Review.create(req.body, {include: 
            {
            model: Film,
            attributes: ['id'],
            },
        })
            .then((review) => res.send(review)
            )
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Review.findAll({include: 
            {
            model: Film,
            attributes: ['id', 'title'],
            },
        })
            .then((review) => res.send(review),
            
            )
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Review.destroy({where:{id:req.params.id}})
            .then(() => res.send({success: 'deleted'}))
            .catch(next);
    })
