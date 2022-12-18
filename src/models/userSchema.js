const { model, Schema } = require('mongoose');

const schema = new Schema({
    name: String,
    password: String,
});

module.exports = model('User', schema, 'user');
