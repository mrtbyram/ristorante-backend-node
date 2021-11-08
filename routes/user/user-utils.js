const defaultPage = () => 1;
const defaultSize = () => 10
const extractUser = (body) => {
    return {
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
