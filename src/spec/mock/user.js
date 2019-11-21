const faker = require('faker');

const normalUser = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
  password: '123456',
};

module.exports = {
  normalUser,
};
