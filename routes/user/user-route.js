const express = require('express');
const { db } = require("../../service/mongo-service");

const router = express.Router();

router.get('/', (req, res) => {
    const page = parseInt(req.query.page ? req.query.page : defaultPage()) - 1;
    const size = parseInt(req.query.size ? req.query.size : defaultSize());

    db().collection('users').find()
        .sort({name: 1})
        .skip(page * size)
        .limit(size)
        .toArray((err, items) => res.send(items));
})

router.get('/:username', (req, res) => {
    db().collection('users').findOne({username: req.params.username},
        (err, item) => !item
        ? res.status(404).send({message: 'User not found'})
        : res.send(item))
})

router.post('/', (req, res) => {
    db().collection('users').insertOne(extractUser(req.body), (err, result) => res.send(result));
})

const defaultPage = () => 1;
const defaultSize = () => 10
const extractUser = (body) => {
    return {
        username: body.username,
        password: body.password,
        email: body.email
    }
}

module.exports = router;
