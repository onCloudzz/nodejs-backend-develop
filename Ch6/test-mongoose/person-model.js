var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PersonSchema = new Schema({
    name: String,
    age: Number,
    email: { type: String, required: true },
});

module.exports = mongoose.model('Person', PersonSchema);