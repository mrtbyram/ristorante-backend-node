const { MongoClient } = require("mongodb");
const mongoMock = require('mongo-mock');
const {dbConnectionError} = require("../error/ristorante-errors");
const mockClient = mongoMock.MongoClient;
mockClient.persist="./node_modules/mongo-mock-db.js";
const config = require('config');


let dbUrl = config.get('db.mongo');
const mongoClient = new MongoClient(dbUrl);
const connect = process.env.NODE_ENV == 'production' ? mongoClient.connect() : mockClient.connect(dbUrl);

const db = connect
    .then(c => c.db('ristorante'))
    .catch(err => {
        console.log(err);
        return { collection: (c) => {
            console.log(err)
            throw dbConnectionError()
        } }
    });

module.exports = db;
