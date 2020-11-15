'use strict';
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const superagent = require('superagent');
const pg = require('pg');

dotenv.config();

//Environment VAriables
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));

const client = new pg.Client(DATABASE_URL);
app.use(cors());


app.get('/pokemon', handlePokeRequest);
app.get('/addcmd', databaseAdd);
app.get('/dispData', databaseDisplay);

//Start Listening and check it the database is connected
client.connect()
  .then(() => {
    console.log('Connected to Command Database');
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });

  })
  .catch(err => console.log('The database is being antisocial or has COVID:', err));

function databaseDisplay(req, res) {
  console.log('databaseDisplay');
  let dataQuery = `SELECT * FROM termcommands`;
  client.query(dataQuery)
    .then(data => {
      console.log(data.rows);
      res.send(data.rows);
    })
    .catch(err => {
      console.log('Error');
      res.status(404).send('Cannot find any records.  Reconnect database or init a new one.  Sorry about that.')
    });
}
function databaseAdd(req, res) {
  console.log('in construction');
  res.send('UnderConstruction');
}
function handlePokeRequest(req, res) {
  try {
    console.log('handlePokeRequest');
    let pokeCharacter = req.query.pokemon;
    let url = `https://pokeapi.co/api/v2/pokemon/${pokeCharacter}`;
    superagent.get(url)
      .then(data => (new Pokemon(data.body)))
      .then((pokeObj) => res.send(pokeObj))
      .catch(err => console.log('Error in PokeDex Retrieval', err));

  }
  catch (err) {
    console.log('Couldn\'t access the Pokemon:', err);
  }
}


function Pokemon(pokedex) {
  this.exp = pokedex.base_experience;
  this.name = pokedex.name;
  this.gamesAppeared = [];
  this.moves = [];
  this.height = pokedex.height;
  this.img = pokedex.sprites.front_default;
  this.types = [];
  this.weight = pokedex.weight;

  //Types
  pokedex.types.forEach(type => this.types.push(type.type.name));

  //Games Appeared in
  pokedex.game_indices.forEach(game => this.gamesAppeared.push(game.version.name));

  //Moves
  pokedex.moves.forEach(element => {
    if (!this.moves.includes(element.move.name)) {
      this.moves.push(element.move.name);
    }
  });
  // console.log('first move', pokedex.moves[0].move.name);

}