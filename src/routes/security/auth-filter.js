const jwtManager = require('jsonwebtoken');
const errors = require('../../error');

const authFilter = (req, res, next) => {
    const auth = req.headers.authorization;

    if (auth == null || auth.length <= 7) {
        next(errors.badCredentials());
    }

    jwtManager.verify(auth.substr(7), `secret`);
    next();
}

module.exports = authFilter;
