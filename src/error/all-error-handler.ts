const pino = require('pino');

const logger = pino();

const allErrorHandler = (err, req, res, next) => {
    logger.error(err.stack.substr(0, 500));
    res.status(500).send({message: err.message});
}

export default allErrorHandler;
