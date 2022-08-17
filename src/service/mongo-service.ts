const { MongoClient } = require("mongodb");
const mongoMock = require('mongo-mock');
const {dbConnectionError} = require("../error/ristorante-errors");
const config = require('config');
const pino = require('pino');

const mockClient = mongoMock.MongoClient;
mockClient.persist="./node_modules/mongo-mock-db.js";
const dbUrl = config.get('db.mongo');
const logger = pino();

const mongoClient = new MongoClient(dbUrl);
const connect = process.env.NODE_ENV == 'production' ? mongoClient.connect() : mockClient.connect(dbUrl);

const db = connect
    .then(c => c.db('ristorante'))
    .catch(err => {
        logger.error(err);
        return { collection: (c) => {
            logger.error(err);
            throw dbConnectionError()
        } }
    });

export default db;
