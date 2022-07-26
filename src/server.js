const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const cors = require('cors');
const ristoranteErrorHandler = require("./error/ristorante-error-handler");
const allErrorHandler = require("./error/all-error-handler");
const {CountryRouter} = require("./routes/country");
const {UserRouter} = require("./routes/user");
const {AuthFilter, AuthServer} = require('./routes/security');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(AuthServer);
if (config.secured) {
    app.use(AuthFilter);
}

app.use('/users', UserRouter);
app.use('/countries', CountryRouter);

app.use(ristoranteErrorHandler);
app.use(allErrorHandler)

module.exports = app;
