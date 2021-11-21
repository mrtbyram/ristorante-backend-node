const express = require('express'),
    db = require("../../service/mongo-service"),
    { defaultPage, defaultSize, extractUser } = require("./user-utils"),
    {userNotFound} = require("../../error/ristorante-errors"),
    pino = require('pino'),
    { validateUsername } = require('./user-validator');

const logger = pino(),
    router = express.Router();

router.get('/',  (req, res, next) => {
    logger.info('get all users request has been received');

    const page = parseInt(req.query.page || defaultPage()) - 1;
    const size = parseInt(req.query.size || defaultSize());

    db.then(d => d.collection('users').find()
        .sort({name: 1})
        .skip(page * size)
        .limit(size)
        .toArray((err, items) => res.send(items)))
        .catch(next);
})

router.get('/:username', (req, res, next) => {
    validateUsername(req.params.username);

    db.then(d => d.collection('users').findOne({username: req.params.username},
        (err, item) => !item
        ? next(userNotFound(req.params.username))
        : res.send(item)))
        .catch(next);
})

router.post('/',  (req, res, next) => {
    db.then(d => d.collection('users').insertOne(extractUser(req.body),
        (err, result) => res.status(201).send()))
        .catch(next);
})

router.delete('/:id', async (req, res, next) => {
    db.then(d => d.collection('users').deleteOne({id: req.params.id}, {},
        (err, result) => res.send()))
        .catch(next);
})

module.exports = router;
