/* eslint-disable no-undef */
const superTest = require('supertest');
const app = require('../../api/index');
const { normalUser } = require('../mock/user');

const request = superTest(app);

let token;

describe('[POST] should register user Test suite [SUCCESS]', () => {
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

// [/api/1v/user/auth/signup] [FAILURE]
describe('[POST] [/api/1v/user/auth/signup] Register Test suite [FAILURE]', () => {
  it('Should respond with status code of 400 on empty request body', async () => {
    const response = await request.post('/api/v1/user/auth/signup').send({});
    expect(response.status).toEqual(400);
  });

  it('Should respond with status code of 409 if user already exist', async () => {
    const response = await request
      .post('/api/v1/user/auth/signup')
      .send(normalUser);
    expect(response.status).toEqual(409);
  });
});

// user verification
describe('User account Verification', () => {
  let response = {};
  const userId = 'eac8cd5b-5767-4cc4-bfca-f58408957b5f';
  const verificationToken = 'e202e7a3-14b1-43a2-9882-3b760b42b4dc';

  beforeAll(async () => {
    response = await request.post(
      `/api/v1/user/auth/confirm/${userId}/${verificationToken}`,
    );
  });

  it('Should verify account given id is valid', () => {
    expect(response.status).toEqual(200);
  });
});

// [/api/v1/user/auth/login] [SUCCESS]
describe('[POST] [/api/v1/user/auth/login] Login Test suite [SUCCESS]', () => {
  let response = {};

  beforeAll(async () => {
    response = await request.post('/api/v1/user/auth/login').send({
      username: 'jane32',
      password: '123456',
    });

    token = response.body.body.token;
  });

  it('Should return response body as JSON', () => {
    expect(response.type).toBe('application/json');
  });

  it('Should respond with status code of 200', () => {
    expect(response.status).toEqual(200);
  });

  it('Should have response body of user object', () => {
    expect(response.body.message).toBe('Log in successful');
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
});

// User permission
describe('[GET] Permissions Test suite [SUCCESS]', () => {
  let response = {};

  beforeAll(async () => {
    response = await request
      .get('/api/v1/user/auth/permissions/jane32')
      .set('Authorization', token);
  });

  it('Should return response body as JSON', () => {
    expect(response.type).toBe('application/json');
  });

  it('Should respond with status code of 200', () => {
    expect(response.status).toEqual(200);
  });
});
