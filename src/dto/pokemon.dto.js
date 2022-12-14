const Pokemon = require('../models/pokemonSchema');

const createPokemon = async (req, res) => {
    try {
        const { name, attaque, defense, type, sprites, api_id } = req.body;
        const pokemon = new Pokemon({
            name,
            attaque,
            defense,
            type,
            sprites,
            api_id,
        });
        await pokemon.save();
        await res.status(200).json({ message: 'Pokémon created' });
    } catch (err) {
        console.log(err, 'error DTO');
        await res.status(500).json({ message: 'Une erreur est survenue' });
        return;
    }
};

const getPokemon = async (req, res) => {
    try {
        const name = req.params.name;
        const pokemon = await Pokemon.findOne({ name });
        await res.status(200).json(pokemon);
    } catch (err) {
        console.log(err, 'error DTO');
        await res.status(500).json({ message: 'Une erreur est survenue' });
        return;
    }
};

const getPokedex = async (req, res) => {
    try {
        const pokedex = await Pokemon.find();
        await res.status(200).json(pokedex);
    } catch (err) {
        console.log(err, 'error DTO');
        await res.status(500).json({ message: 'Une erreur est survenue' });
        return;
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
        await res.status(200).json({ message: 'Pokémon edited' });
    } catch (err) {
        console.log(err, 'error DTO');
        await res.status(500).json({ message: 'Une erreur est survenue' });
        return;
    }
};

const deletePokemon = async (req, res) => {
    try {
        const name = req.params.name;
        const pokemon = await Pokemon.findOne({ name });
        await pokemon.remove();
        await res.status(200).json({ message: 'Pokémon deleted' });
    } catch (err) {
        console.log(err, 'error DTO');
        await res.status(500).json({ message: 'Une erreur est survenue' });
        return;
    }
};

module.exports = {
    createPokemon,
    getPokemon,
    getPokedex,
    patchPokemon,
    deletePokemon,
};
