const express = require('express');

const {
  jokesController,
  randomJokeController,
  personalizedJokeController,
} = require('./controllers');

const app = express();
app.use(express.static('public'));

app.get('/jokes', jokesController);
app.get('/jokes/random', randomJokeController);
app.get('/joke/random/personal/:first/:last', personalizedJokeController);

module.exports = app;
