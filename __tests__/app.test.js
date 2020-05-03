/**
 * @jest-environment node
 */

const request = require('supertest');
const nock = require('nock');
const app = require('../src/app');
const { mockJokes, mockRandomJokes, mockPersonalJokes } = require('../data/mocks');

describe('GET / Homepage', () => {
  it('should respond with some homepage markup', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Welcome to my jokes API!');
  });
});

describe('GET /jokes', () => {
  it('GET / should respond with a jokes list', async () => {
    nock('https://api.icndb.com')
      .get('/jokes')
      .reply(200, mockJokes);
    const res = await request(app).get('/jokes');
    expect(res.statusCode).toEqual(200);
    expect(res.body.jokes).toEqual(mockJokes.value);
  });
  it('Should respond with an error message', async () => {
    nock('https://api.icndb.com')
      .get('/jokes')
      .replyWithError({ statusCode: 500, message: 'That is an internal server error' });
    const res = await request(app).get('/jokes');
    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual('That is an internal server error');
  });
});

describe('GET /jokes/random', () => {
  it('should respond with a random joke message', async () => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .reply(200, mockRandomJokes);
    const res = await request(app).get('/jokes/random');
    expect(res.statusCode).toEqual(200);
    expect(res.body.randomJoke).toEqual(mockRandomJokes.value);
  });
  it('should respond with an error message', async () => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .replyWithError({ statusCode: 404, message: 'Page is not found' });
    const res = await request(app).get('/jokes/random');
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual('Page is not found');
  });
});

describe('GET /joke/random/personal', () => {
  it('should respond with a personal joke message', async () => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'manchester', lastName: 'codes' })
      .reply(200, mockPersonalJokes);
    const res = await request(app).get('/joke/random/personal/manchester/codes');
    expect(res.statusCode).toEqual(200);
    expect(res.body.personalJoke).toEqual(mockPersonalJokes.value);
  });
  it('should respond with an error message', async () => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'manchester', lastName: 'codes' })
      .replyWithError({ statusCode: 400, message: 'That is a bad request' });
    const res = await request(app).get('/joke/random/personal/manchester/codes');
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual('That is a bad request');
  });
});
