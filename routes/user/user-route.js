const express = require('express');
const { db } = require("../../service/mongo-service");

const router = express.Router();

router.get('/', (req, res) => {
    db().collection('users').find()
        .sort({name: 1})
        .skip((parseInt(req.query.page) - 1) * parseInt(req.query.size))
        .limit(parseInt(req.query.size))
        .toArray((err, items) => res.send(items));
})

router.get('/:username', (req, res) => {
    db().collection('users').findOne({username: req.params.username},
        (err, item) => !item
        ? res.status(404).send({message: 'User not found'})
        : res.send(item))
})

router.post('/', (req, res) => {
    db().collection('users').insertOne(req.body, (err, result) => res.send(result));
})


module.exports = router;
