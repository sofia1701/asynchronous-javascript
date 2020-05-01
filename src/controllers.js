const request = require('request');

const mainController = (req, res) => {
  res.send({
    message: 'Welcome to my jokes API!',
  });
};

const jokesController = (req, res) => {
  request('https://api.icndb.com/jokes', (error, jokesApiResponse) => {
    if (error) {
      console.log(error);
    }
    const parsedResponse = JSON.parse(jokesApiResponse.body);
    res.send({ jokes: parsedResponse.value });
  });
};

const randomJokeController = (req, res) => {
  res.send({
    message: 'This is a random joke endpoint',
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
