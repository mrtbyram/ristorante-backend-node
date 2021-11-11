const express = require('express');
const user = require('./routes/user');
const bodyParser = require('body-parser');
const cors = require('cors');
const ristoranteErrorHandler = require("./error/ristorante-error-handler");
const allErrorHandler = require("./error/all-error-handler");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/users', user.userRouter);

app.use(ristoranteErrorHandler);
app.use(allErrorHandler)

module.exports = app;
