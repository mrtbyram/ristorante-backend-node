class RistoranteError extends Error {
    status;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

module.exports = {
    userNotFound: (username: string) => new RistoranteError(`user with name ${username} not found`, 404),
    dbConnectionError: () => new RistoranteError('DB Connection Problem', 500),
    badCredentials: () => new RistoranteError('username or password is wrong', 400),
    RistoranteError
}
