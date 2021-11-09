const errorHandler = (err, req, res, next) => {
    console.log(err.stack.substr(0, 500));
    res.status(err.status).send({message: err.message});
}

module.exports = errorHandler;
