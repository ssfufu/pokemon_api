const controller = require('./controllers/pokemon.controller');
const dto = require('./dto/pokemon.dto');
const express = require('express');
require('./database');
const app = express();
const port = 3030;

app.use(express.json());

app.get('/pokedex', controller.getPokedex, dto.getPokedex);

app.get('/pokemon/:name', controller.getPokemon, dto.getPokemon);

app.post('/create/pokemon', controller.createPokemon, dto.createPokemon);

app.patch('/edit/pokemon/:name', controller.patchPokemon, dto.patchPokemon);

// app.delete(
//     '/delete/pokemon/:pokemonName',
//     controller.deletePokemon,
//     dto.deletePokemon
// );

app.listen(port, () => console.log(`App listening on port ${port}!`));
