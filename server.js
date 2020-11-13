'use strict';

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const superagent = require('superagent');
const pg = require('pg');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));
app.use(cors());

app.get('/pokemon', handlePokeRequest);
//app.get('./test', res.send('Test Complete'));


function handlePokeRequest(req, res) {
  try {
    console.log('handlePokeRequest');
    let pokeCharacter = req.query.pokemon;
    let url = `https://pokeapi.co/api/v2/pokemon/${pokeCharacter}`;
    superagent.get(url)
      .then(data => (new Pokemon(data.body)))
      .then((pokeObj) => res.send(pokeObj))
      .catch(console.log('Error in PokeDex Retrieval'));
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

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});