const { MongoClient } = require("mongodb");
const mongoMock = require('mongo-mock');
const {dbConnectionError} = require("../error/ristorante-errors");
const mockClient = mongoMock.MongoClient;
mockClient.persist="./node_modules/mongo-mock-db.js";

const mongoClient = new MongoClient('mongodb+srv://byram:byram@cluster0.uymvn.mongodb.net/ristorante?retryWrites=true&w=majority');
const connect = process.env.NODE_ENV == 'production'
    ? mongoClient.connect()
    : mockClient.connect('mongodb://localhost:27017/myproject');
const db = connect
    .then(c => c.db('ristorante'))
    .catch(err => {
        console.log(err);
        return { collection: (c) => { throw dbConnectionError() } }
    });

module.exports = db;
