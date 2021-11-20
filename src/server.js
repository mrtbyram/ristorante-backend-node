const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ristoranteErrorHandler = require("./error/ristorante-error-handler");
const allErrorHandler = require("./error/all-error-handler");
const { CountryRouter } = require("./routes/country");
const { UserRouter } = require("./routes/user");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/user', UserRouter);
app.use('/country', CountryRouter);

app.use(ristoranteErrorHandler);
app.use(allErrorHandler)

module.exports = app;
