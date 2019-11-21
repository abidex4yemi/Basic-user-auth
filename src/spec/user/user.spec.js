/* eslint-disable no-undef */
const superTest = require('supertest');
const app = require('../../api/index');
const { normalUser } = require('../mock/user');
const models = require('../../db/models');

const request = superTest(app);

models.sequelize.sync({});

describe('[POST] [/api/v1/auth/register] Register Test suite [SUCCESS]', () => {
  let response = {};

  beforeAll(async () => {
    response = await request.post('/api/v1/user/auth/signup').send(normalUser);
  });

  it('Should return response body as JSON', () => {
    expect(response.type).toBe('application/json');
  });

  it('Should respond with status code of 201', () => {
    expect(response.status).toEqual(201);
  });

  it('Should have response body with success', () => {
    expect(response.body.success).toBeTruthy();
  });

  it('Should have response body of user object', () => {
    expect(response.body.message).toBe(
      'Account created successfully, please check your email for account verification',
    );
  });

  it('Should have response body with success true', () => {
    expect(response.body.success).toBeTruthy();
  });
});

// [/api/1v/user/auth/signup][FAILURE];
describe('[POST] [/api/1v/user/auth/signup] Register Test suite [FAILURE]', () => {
  it('Should respond with status code of 400 on empty request body', async () => {
    const response = await request.post('/api/1v/user/auth/signup').send({});
    expect(response.status).toEqual(400);
  });

  it('Should respond with status code of 409 if user already exist', async () => {
    const response = await request
      .post('/api/1v/user/auth/signup')
      .send(normalUser);
    expect(response.status).toEqual(409);
  });
});

// [/api/v1/user/auth/login] [SUCCESS]
describe('[POST] [/api/v1/user/auth/login] Login Test suite [SUCCESS]', () => {
  let response = {};

  beforeAll(async () => {
    response = await request.post('/api/v1/user/auth/login').send({
      username: normalUser.username,
      password: normalUser.password,
    });
  });

  it('Should return response body as JSON', () => {
    expect(response.type).toBe('application/json');
  });

  it('Should respond with status code of 200', () => {
    expect(response.status).toEqual(200);
  });

  it('Should have response body of user object', () => {
    expect(response.body.message).toBe('Log in successful');
    expect(response.body.body).toHaveProperty('user');
  });

  it('Should have response body with success true', () => {
    expect(response.body.success).toBeTruthy();
  });

  it('Should have a response body with token', () => {
    expect(response.body.body).toHaveProperty('token');
  });
});

// [/api/v1/user/auth/register] [FAILURE]
describe('[POST] [/api/v1/user/auth/login] Register Test suite [FAILURE]', () => {
  it('Should respond with status code of 400 on empty request body', async () => {
    const response = await request.post('/api/v1/user/auth/login').send({});
    expect(response.status).toEqual(400);
  });

  it('Should respond with status code 404', async () => {
    const response = await request.post('/api/v1/user/auth/login').send({
      password: '123456',
      username: 'june404',
    });
    expect(response.status).toEqual(404);
  });

  it('Should respond with User does not exist', async () => {
    const response = await request.post('/api/v1/user/auth/login').send({
      password: '1234566',
      username: 'june404',
    });
    expect(response.body.message).toEqual('User does not exist');
  });

  it('Should respond with status code 400', async () => {
    const response = await request.post('/api/v1/user/auth/login').send({
      password: '12345688',
      username: 'june40',
    });
    expect(response.status).toEqual(400);
  });
});
