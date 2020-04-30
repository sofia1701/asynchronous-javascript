const express = require('express');
const { mainController } = require('./controllers');

const app = express();

app.use('/controllers', mainController);

module.exports = app;
