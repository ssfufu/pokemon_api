const { model, Schema } = require('mongoose');

const schema = new Schema({
    pokeId: Number,
    name: String,
    attaque: Number,
    defense: Number,
    types: [Object],
    sprites: String,
    api_id: Number,
    poke_color: String,
});

module.exports = model('Pokemon', schema, 'pokemon');
