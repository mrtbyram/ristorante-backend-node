const express = require('express');
const user = require('./routes/user');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require("./error/error-handler");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/users', user.userRouter);

app.use(errorHandler);

module.exports = app;
