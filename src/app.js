const express = require('express');

const {
  mainController,
  jokesController,
  randomJokeController,
  personalizedJokeController,
} = require('./controllers');

const app = express();

app.get('/', mainController);
app.get('/jokes', jokesController);
app.get('/joke/random', randomJokeController);
app.get('/joke/random/personal/:first/:last', personalizedJokeController);

module.exports = app;
