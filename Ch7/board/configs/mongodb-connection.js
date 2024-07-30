const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://onCloud:Pinbol0315@cluster0.63loqzc.mongodb.net/board"

module.exports = function (callback) {
    return MongoClient.connect(uri, callback);
};