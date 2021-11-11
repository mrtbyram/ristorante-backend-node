const express = require('express');
const db = require("../../service/mongo-service");
const { defaultPage, defaultSize, extractUser } = require("./user-utils");
const {userNotFound} = require("../../error/ristorante-errors");

const router = express.Router();

router.get('/', async (req, res, next) => {
    const page = parseInt(req.query.page || defaultPage()) - 1;
    const size = parseInt(req.query.size || defaultSize());

    (await db).collection('users').find()
        .sort({name: 1})
        .skip(page * size)
        .limit(size)
        .toArray((err, items) => res.send(items));
})

router.get('/:username', async (req, res, next) => {
    (await db).collection('users').findOne({username: req.params.username},
        (err, item) => !item
        ? next(userNotFound(req.params.username))
        : res.send(item))
})

router.post('/', async (req, res, next) => {
    (await db).collection('users').insertOne(extractUser(req.body),
        (err, result) => res.status(201).send());
})

router.delete('/:id', async (req, res) => {
    (await db).collection('users').deleteOne({id: req.params.id}, {},
        (err, result) => res.send());
})

module.exports = router;
