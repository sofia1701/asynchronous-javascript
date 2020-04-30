const mainController = (req, res) => {
  res.send({
    message: 'Welcome to my jokes API!',
  });
};

const jokesController = (req, res) => {
  res.send({
    message: 'This is the all jokes endpoint',
  });
};

const randomJokeController = (req, res) => {
  res.send({
    message: 'This is a ramdom joke endpoint',
  });
};

const personalizedJokeController = (req, res) => {
  res.send({
    message: 'Reached the personal joke endpoint',
  });
};

module.exports = {
  mainController,
  jokesController,
  randomJokeController,
  personalizedJokeController,
};
