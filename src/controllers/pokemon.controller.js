const Pokemon = require('../models/pokemonSchema');
const createPokemon = async (req, res, next) => {
    try {
        const { name, attaque, defense, types } = req.body;
        const body = [name, attaque, defense, types];
        if (!name || !attaque || !defense || !types) {
            await res.status(404).json({ message: 'Content is required' });
            return;
        }
        body.forEach(async (content) => {
            if (content.length > 20) {
                await res.status(401).json({ message: 'Content too long' });
                return;
            }
            if (content === undefined) {
                await res.status(401).json({ message: 'Content is required' });
                return;
            }
        });
        next();
    } catch {
        console.log(err, 'error CONTROLLER');
        await res.status(500).json({ message: 'Une erreur est survenue' });
        return;
    }
};

const getPokemon = async (req, res, next) => {
    try {
        const name = req.params.name;
        const pokemon = await Pokemon.findOne({ name });
        if (!pokemon || pokemon.length === 0 || pokemon === undefined) {
            await res.status(404).json({ message: 'Pokémon not found' });
            return;
        }
        next();
    } catch (err) {
        console.log(err, 'error CONTROLLER');
        await res.status(500).json({ message: 'Une erreur est survenue' });
        return;
    }
};

const getPokedex = async (req, res, next) => {
    try {
        const pokedex = await Pokemon.find();
        if (!pokedex || pokedex.length === 0 || pokedex === undefined) {
            await res.status(404).json({ message: 'Pokédex not found' });
            return;
        }
        next();
    } catch (err) {
        console.log(err, 'error CONTROLLER');
        await res.status(500).json({ message: 'Une erreur est survenue' });
        return;
    }
};

const patchPokemon = async (req, res, next) => {
    try {
        const name = req.params.name;
        const { newName, newAttaque, newDefense } = req.body;
        const newThings = [newName, newAttaque, newDefense];
        const pokemon = await Pokemon.findOne({ name });
        if (!pokemon || pokemon.length === 0 || pokemon === undefined) {
            await res.status(404).json({ message: 'Pokémon not found' });
        }
        newThings.forEach(async (content) => {
            if (content.length > 20) {
                await res.status(401).json({ message: 'Content too long' });
                return;
            }
            if (content === undefined) {
                await res.status(404).json({ message: 'Content is required' });
                return;
            }
        });
        if (newAttaque === pokemon.attaque) {
            await res.status(404).json({ message: 'New is required' });
            return;
        }
        if (newDefense === pokemon.defense) {
            await res.status(404).json({ message: 'New is required' });
            return;
        }
        if (newName === pokemon.name) {
            await res.status(404).json({ message: 'New is required' });
            return;
        }
        next();
    } catch (err) {
        console.log(err, 'error CONTROLLER');
        await res.status(500).json({ message: 'Une erreur est survenue' });
        return;
    }
};

const deletePokemon = async (req, res, next) => {
    try {
        const name = req.params.name;
        const pokemon = await Pokemon.findOne({ name });
        if (!pokemon || pokemon.length === 0 || pokemon === undefined) {
            await res.status(404).json({ message: 'Pokémon not found' });
            return;
        }
        next();
    } catch (err) {
        console.log(err, 'error CONTROLLER');
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
