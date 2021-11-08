const {MongoClient} = require("mongodb");

const mongoClient = new MongoClient('mongodb+srv://byram:byram@cluster0.uymvn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
let db;

mongoClient.connect().then(c => db = c.db('Cluster0'));

module.exports.db = () => db;
