const { RistoranteError } = require('./ristorante-errors');
const pino = require('pino');

const logger = pino();

const ristoranteErrorHandler = (err, req, res, next) => {
    if(err instanceof RistoranteError) {
        logger.error(err.stack.substr(0, 500));
        res.status(err.status).send({message: err.message});
    } else {
        next(err);
    }
}

export { ristoranteErrorHandler };
