const express = require('express'),
    db = require("../../service/mongo-service"),
    { defaultPage, defaultSize, extractUser } = require("./user-utils"),
    {userNotFound} = require("../../error/ristorante-errors"),
    pino = require('pino'),
    { validateUsername } = require('./user-validator');

const logger = pino(),
    router = express.Router();

router.get('/',  async (req, res) => {
    logger.info('get all users request has been received');

    const page = parseInt(req.query.page || defaultPage()) - 1;
    const size = parseInt(req.query.size || defaultSize());

    await db.then(d => d.collection('users').find()
        .sort({name: 1})
        .skip(page * size)
        .limit(size)
        .toArray((err, items) => res.send(items)));
})

router.get('/:username', async (req, res) => {
    validateUsername(req.params.username);

    await db.then(d => d.collection('users').findOne({username: req.params.username},
        (err, item) => !item
        ? next(userNotFound(req.params.username))
        : res.send(item)));
})

router.post('/',   async (req, res) => {
    await db.then(d => d.collection('users').insertOne(extractUser(req.body),
        () => res.status(201).send()));
})

router.delete('/:id', async (req, res) => {
    await db.then(d => d.collection('users').deleteOne({id: req.params.id}, {},
        () => res.send()));
})

module.exports = router;
