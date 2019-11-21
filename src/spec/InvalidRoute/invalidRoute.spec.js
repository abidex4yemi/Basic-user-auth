/* eslint-disable no-undef */
const superTest = require('supertest');
const app = require('../../api/index');

const request = superTest(app);

describe('Invalid Route Request [GET / POST] Test suite', () => {
  let response = null;

  beforeAll(async () => {
    /* Runs before all tests */
    response = await request.get('/doesNotExist');
  });

  it('Should respond with status code of 404', async () => {
    expect(response.status).toEqual(404);
  });

  it('Should have response body', () => {
    expect(response.body.message).toBe('Route does not exist...');
  });
});
