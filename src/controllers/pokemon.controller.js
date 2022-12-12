const Pokemon = require('../models/pokemonSchema');
const createPokemon = async (req, res, next) => {
    try {
        const { name, attaque, defense, type } = req.body;
        const body = [name, attaque, defense, type];
        if (!name || !attaque || !defense || !type) {
            res.status(404).json({ message: 'Content is required' });
            return;
        }
        body.forEach((content) => {
            if (content.length > 20) {
                res.status(401).json({ message: 'Content too long' });
                return;
            }
            if (content === undefined) {
                res.status(404).json({ message: 'Content is required' });
                return;
            }
        });
        next();
    } catch {
        console.log(err, 'error CONTROLLER');
        res.status(500).json({ message: 'Une erreur est survenue' });
    }
};

const getPokemon = async (req, res, next) => {
    try {
        const name = req.params.name;
        const pokemon = await Pokemon.findOne({ name });
        if (!pokemon || pokemon.length === 0 || pokemon === undefined) {
            res.status(404).json({ message: 'Pokémon not found' });
            return;
        }
        next();
    } catch (err) {
        console.log(err, 'error CONTROLLER');
        res.status(500).json({ message: 'Une erreur est survenue' });
    }
};

const getPokedex = async (res, req, next) => {
    try {
        const pokedex = await Pokemon.find();
        if (!pokedex || pokedex.length === 0 || pokedex === undefined) {
            res.status(404).json({ message: 'Pokedex not found' });
            return;
        }
        next();
    } catch (err) {
        console.log(err, 'error CONTROLLER');
        res.status(500).json({ message: 'Une erreur est survenue' });
    }
};

const patchPokemon = async (req, res, next) => {
    try {
        const name = req.params.name;
        const { newName, newAttaque, newDefense } = req.body;
        const newThings = [newName, newAttaque, newDefense];
        const pokemon = await Pokemon.findOne({ name });
        if (!pokemon || pokemon.length === 0 || pokemon === undefined) {
            res.status(404).json({ message: 'Pokémon not found' });
            return;
        }
        newThings.forEach((content) => {
            if (content.length > 20) {
                res.status(401).json({ message: 'Content too long' });
                return;
            }
            if (content === undefined) {
                res.status(404).json({ message: 'Content is required' });
                return;
            }
        });
        if (
            newAttaque === pokemon.attaque ||
            newDefense === pokemon.defense ||
            newName === pokemon.name
        ) {
            res.status(404).json({ message: 'New is required' });
            return;
        }
        next();
    } catch (err) {
        console.log(err, 'error CONTROLLER');
        res.status(500).json({ message: 'Une erreur est survenue' });
    }
};

const deletePokemon = async (req, res, next) => {
    try {
        const name = req.params.name;
        const pokemon = await Pokemon.findOne({ name });
        if (
            !pokemon ||
            pokemon.length === 0 ||
            !name ||
            name.length === 0 ||
            name === undefined ||
            name === null ||
            name === '' ||
            name === ' ' ||
            pokemon === null ||
            pokemon === '' ||
            pokemon === ' ' ||
            pokemon === undefined
        ) {
            res.status(404).json({ message: 'Pokémon not found' });
            return;
        }
        next();
    } catch (err) {
        console.log(err, 'error CONTROLLER');
        res.status(500).json({ message: 'Une erreur est survenue' });
    }
};

module.exports = {
    createPokemon,
    getPokemon,
    getPokedex,
    patchPokemon,
    deletePokemon,
};
