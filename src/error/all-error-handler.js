
const allErrorHandler = (err, req, res, next) => {
    console.log(err.stack.substr(0, 500));
    res.status(500).send({message: err.message});
}

module.exports = allErrorHandler;
