let { RistoranteError } = require('./ristorante-errors');

const ristoranteErrorHandler = (err, req, res, next) => {
    if(err instanceof RistoranteError) {
        console.log(err.stack.substr(0, 500));
        res.status(err.status).send({message: err.message});
    } else {
        next(err);
    }
}

module.exports = ristoranteErrorHandler;
