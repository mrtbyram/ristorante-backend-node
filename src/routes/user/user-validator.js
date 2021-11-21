const Joi = require('joi');

const usernameSchema = Joi.string().label('username').max(40);

module.exports = {
    validateUsername: (username) => Joi.assert(username, usernameSchema)
}
