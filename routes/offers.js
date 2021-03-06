const express = require('express');
const router = express.Router();
const db = require('../models');
const { check, validationResult } = require('express-validator');



router.get('/:id', (req, res, next) => {
    db.offer.findOne({
        where: { id: req.params.id },
        include: [
            { model: db.user },
            { model: db.game }
        ]
    })
        .then(offer => {
            console.log(offer);
            console.log(offer.user);
            res.json(offer);
        })
        .catch((err) => {
            console.log(err);
            next();
        });
});

router.post('/add', async (req, res) => {
    let { header, description, accountLogin, sellerPaysCharge, accountCreatedDate, price, games } = req.body;
    let foundGames = await db.game.findAll({ where: { value: games } })

    db.offer.create({ header, description, accountLogin, sellerPaysCharge, accountCreatedDate, price, userId: 1 })
        .then(offer => {
            let ids = foundGames.map((el) => el.id);
            offer.addGames(ids);
        })
        .then((data) => {
            res.redirect('/offers');
        })
        .catch(err => console.log(err));
})

router.get('/', (req, res) => {
    let { game, priceFrom, priceTo } = req.query;
    let options = { where: {}};
    let gameOptions;
    if (game) {
        gameOptions = { value:  game }
    }
    if (priceFrom && priceTo) {
        options.where.price = { $between: [priceFrom, priceTo] }
    }
    options.include = [
        {
            model: db.user,          
        },
        {
            model: db.order    
        },
        {
            model: db.game,
            where: gameOptions
        }
    ]
    //const game = req.query.game;
    db.offer.findAll(options)
        .then(offers => {
            res.json(offers);
        })
        .catch((err) => console.log(err));
});



router.delete('/:id', (req, res) => {
    db.offer.destroy({
        where: {
            id: req.params.id
        }
    })
        .then((offer) => {
            res.json('success ' + req.params.id);
        })
        .catch(err => console.log(err));

});

module.exports = router;