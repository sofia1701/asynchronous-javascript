const request = require('supertest');
const app = require('../src/app');

it('GET / should respond with a welcome message', done => {
  request(app)
    .get('/')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('Welcome to my jokes API!');
      done();
    });
});

it('GET / should respond with a message', done => {
  request(app)
    .get('/jokes')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('This is the all jokes endpoint');
      done();
    });
});

it('GET / should respond with a ramdom joke message', done => {
  request(app)
    .get('/joke/random')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('This is a ramdom joke endpoint');
      done();
    });
});

it('GET / should respond with a personal joke message', done => {
  request(app)
    .get('/joke/random/personal/sofia/dionisio')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('This is a personal joke endpoint');
      done();
    });
});
