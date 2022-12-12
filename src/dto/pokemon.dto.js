const Pokemon = require('../models/pokemonSchema');

const createPokemon = async (req, res) => {
    try {
        const { name, attaque, defense, type } = req.body;
        const pokemon = new Pokemon({
            name,
            attaque,
            defense,
            type,
        });
        await pokemon.save();
        res.status(200).json({ message: 'Pokémon created' });
    } catch (err) {
        console.log(err, 'error DTO');
        res.status(500).json({ message: 'Une erreur est survenue' });
    }
};

const getPokemon = async (req, res) => {
    try {
        const name = req.params.name;
        const pokemon = await Pokemon.findOne({ name });
        res.status(200).json(pokemon);
    } catch (err) {
        console.log(err, 'error DTO');
        res.status(500).json({ message: 'Une erreur est survenue' });
    }
};

const getPokedex = async (req, res) => {
    try {
        const pokedex = await Pokemon.find();
        res.status(200).json(pokedex);
    } catch (err) {
        console.log(err, 'error DTO');
        res.status(500).json({ message: 'Une erreur est survenue' });
    }
};

const patchPokemon = async (req, res) => {
    try {
        const name = req.params.name;
        const { newName, newAttaque, newDefense } = req.body;
        const pokemon = await Pokemon.findOne({ name });
        pokemon.attaque = newAttaque;
        pokemon.defense = newDefense;
        pokemon.name = newName;
        await pokemon.save();
        res.status(200).json({ message: 'Pokémon edited' });
    } catch (err) {
        console.log(err, 'error DTO');
        res.status(500).json({ message: 'Une erreur est survenue' });
    }
};

module.exports = { createPokemon, getPokemon, getPokedex, patchPokemon };
