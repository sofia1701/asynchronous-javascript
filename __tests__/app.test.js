/**
 * @jest-environment node
 */

const request = require('supertest');
const nock = require('nock');
const app = require('../src/app');

describe('GET / Homepage', () => {
  it('should respond with some homepage markup', done => {
    request(app)
      .get('/')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('Welcome to my jokes API!');
        done();
      });
  });
});

describe('GET /jokes', () => {
  it('GET / should respond with a jokes list', done => {
    const mockResponse = {
      type: 'success',
      value: [
        {
          id: 1,
          joke: 'i am a joke',
          categories: [],
        },
        {
          id: 2,
          joke: 'i am another joke',
          categories: [],
        },
      ],
    };
    nock('https://api.icndb.com')
      .get('/jokes')
      .reply(200, mockResponse);
    request(app)
      .get('/jokes')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.jokes).toEqual([
          {
            categories: [],
            id: 1,
            joke: 'i am a joke',
          },
          {
            categories: [],
            id: 2,
            joke: 'i am another joke',
          },
        ]);
        done();
      });
  });
  it('Should respond with an error message', done => {
    nock('https://api.icndb.com')
      .get('/jokes')
      .replyWithError({ statusCode: 500, message: 'That is an internal server error' });
    request(app)
      .get('/jokes')
      .then(res => {
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toEqual('That is an internal server error');
        done();
      });
  });
});

describe('GET /jokes/random', () => {
  it('should respond with a random joke message', done => {
    const mockResponse = {
      type: 'success',
      value: {
        id: 115,
        joke: 'i am a random joke',
        categories: [],
      },
    };
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .reply(200, mockResponse);
    request(app)
      .get('/jokes/random')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.randomJoke).toEqual({
          categories: [],
          id: 115,
          joke: 'i am a random joke',
        });
        done();
      });
  });
  it('should respond with an error message', done => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .replyWithError({ statusCode: 404, message: 'Page is not found' });
    request(app)
      .get('/jokes/random')
      .then(res => {
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual('Page is not found');
        done();
      });
  });
});

describe('GET /joke/random/personal', () => {
  it('should respond with a personal joke message', async () => {
    const mockResponse = {
      type: 'success',
      value: {
        id: 141,
        joke: 'random joke about manchester codes',
        categories: [],
      },
    };
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'manchester', lastName: 'codes' })
      .reply(200, mockResponse);
    request(app)
      .get('/joke/random/personal/manchester/codes')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.personalJoke).toEqual(mockResponse.value);
      });
  });
  it('should respond with an error message', async () => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'manchester', lastName: 'codes' })
      .replyWithError({ statusCode: 400, message: 'That is a bad request' });
    request(app)
      .get('/joke/random/personal/manchester/codes')
      .then(res => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toEqual('That is a bad request');
      });
  });
});
