const { model, Schema } = require('mongoose');

const schema = new Schema({
    pokeId: Number,
    name: String,
    attaque: Number,
    defense: Number,
    type: [Object],
    sprites: String,
    api_id: Number,
});

module.exports = model('Pokemon', schema, 'pokemon');
