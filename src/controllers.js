const request = require('request');
const axios = require('axios');

const mainController = (req, res) => {
  res.send({
    message: 'Welcome to my jokes API!',
  });
};

const jokesController = (req, res) => {
  request('https://api.icndb.com/jokes', (error, jokesApiResponse) => {
    if (error) {
      // eslint-disable-next-line
      console.log(error);
    }
    const parsedResponse = JSON.parse(jokesApiResponse.body);
    res.send({ jokes: parsedResponse.value });
  });
};

const randomJokeController = (req, res) => {
  axios
    .get('https://api.icndb.com/jokes/random?exclude=[explicit]')
    .then(response => {
      res.send({ randomJoke: response.data.value });
    })
    .catch(error => {
      // eslint-disable-next-line
      console.log(error);
    });
};

const personalizedJokeController = (req, res) => {
  res.send({
    message: 'This is a personal joke endpoint',
  });
};

module.exports = {
  mainController,
  jokesController,
  randomJokeController,
  personalizedJokeController,
};
