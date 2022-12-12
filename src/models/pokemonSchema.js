const { model, Schema } = require('mongoose');

const schema = new Schema({
    name: String,
    attaque: Number,
    defense: Number,
    type: String,
});

module.exports = model('Pokemon', schema, 'pokemon');
