const {MongoClient} = require("mongodb");

const mongoClient = new MongoClient('mongodb+srv://byram:byram@cluster0.uymvn.mongodb.net/ristorante?retryWrites=true&w=majority');
const db = mongoClient.connect().then(c => c.db('ristorante'));

module.exports = db;
