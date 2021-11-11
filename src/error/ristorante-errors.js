class RistoranteError extends Error {
    status;

    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

module.exports = {
    userNotFound: (username) => new RistoranteError(`user with name ${username} not found`, 404),
    dbConnectionError: () => new RistoranteError('DB Connection Problem', 500),
    RistoranteError
}
