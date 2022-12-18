const controller = require('./controllers/pokemon.controller');
const dto = require('./dto/pokemon.dto');
const dtoUser = require('./dto/user.dto');
const con = require('./controllers/user.controller');
const express = require('express');
require('./database');
const app = express();
const port = 3030;
require('dotenv').config();
const cors = require('cors');

const auth = require('./middlewares/auth');

app.use(express.json());
app.use(
    cors({
        origin: '*',
    })
);

app.get(
    '/pokedex',
    auth.authenticateToken,
    controller.getPokedex,
    dto.getPokedex
);

app.get(
    '/pokemon/:name',
    auth.authenticateToken,
    controller.getPokemon,
    dto.getPokemon
);

app.post(
    '/create/pokemon',
    auth.authenticateToken,
    controller.createPokemon,
    dto.createPokemon
);

app.patch(
    '/edit/pokemon/:name',
    auth.authenticateToken,
    controller.patchPokemon,
    dto.patchPokemon
);

app.delete(
    '/delete/pokemon/:name',
    auth.authenticateToken,
    controller.deletePokemon,
    dto.deletePokemon
);

app.post('/login', con.login, dtoUser.login);

app.post('/register', con.register, dtoUser.register);

app.listen(port, () => console.log(`App listening on port ${port}!`));
