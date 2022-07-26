const jwt = require('jsonwebtoken');
const {Router} = require('express');
const db = require("../../service/mongo-service");
let errors = require('../../error');

const router = Router();

function signJWT(username) {
    return jwt.sign({username, role: 'admin'}, 'secret', {expiresIn: '2m'});
}

router.post('/token', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    db.then(d => d.collection('users').findOne({username},
        (err, item) => !item
            ? next(errors.badCredentials())
            : password === item.password
                ? res.send({accessToken: signJWT(username)})
                : errors.badCredentials()));
});

module.exports = router;
