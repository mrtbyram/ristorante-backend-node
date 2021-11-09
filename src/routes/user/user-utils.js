let uuid = require('uuid');

const defaultPage = () => 1;
const defaultSize = () => 10
const extractUser = (body) => {
    return {
        id: uuid.v4(),
        username: body.username,
        password: body.password,
        email: body.email
    }
}

module.exports = {
    defaultSize,
    defaultPage,
    extractUser
}
