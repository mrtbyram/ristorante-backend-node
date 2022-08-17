const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const cors = require('cors');
import {ristoranteErrorHandler} from './error/ristorante-error-handler';

import allErrorHandler from './error/all-error-handler';
const {CountryRouter} = require("./routes/country");
import {UserRouter} from './routes/user';
import {AuthServer, AuthFilter} from './routes/security';

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

export default app;
