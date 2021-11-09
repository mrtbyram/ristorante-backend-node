const express = require('express');
const db = require("../../service/mongo-service");
const { defaultPage, defaultSize, extractUser } = require("./user-utils");

const router = express.Router();

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page ? req.query.page : defaultPage()) - 1;
    const size = parseInt(req.query.size ? req.query.size : defaultSize());

    (await db).collection('users').find()
        .sort({name: 1})
        .skip(page * size)
        .limit(size)
        .toArray((err, items) => res.send(items));
})

router.get('/:username', async (req, res) => {
    (await db).collection('users').findOne({username: req.params.username},
        (err, item) => !item
        ? res.status(404).send({message: 'User not found'})
        : res.send(item))
})

router.post('/', async (req, res) => {
    (await db).collection('users').insertOne(extractUser(req.body),
        (err, result) => res.status(201).send(result));
})

router.delete('/:id', async (req, res) => {
    (await db).collection('users').deleteOne({id: req.params.id}, {}, (err, result) => res.send(result));
})

module.exports = router;
