const express = require('express');
const user = require('./routes/user');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/users', user.userRouter);

module.exports = app;
