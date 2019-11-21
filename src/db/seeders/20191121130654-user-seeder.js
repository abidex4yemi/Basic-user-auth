const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');

const hash = bcrypt.hashSync('123456', bcrypt.genSaltSync(10));

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      'users',
      [
        {
          id: uuidv4(),
          firstName: 'Jane',
          lastName: 'Show',
          email: 'jane@example.com',
          username: 'jane32',
          password: `${hash}`,
          verified: true,
          role: 'normal_user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          firstName: 'Shola',
          lastName: 'Snow',
          email: 'shola@example.com',
          username: 'shola',
          password: `${hash}`,
          verified: true,
          role: 'normal_user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          firstName: 'Abidemi',
          lastName: 'Yemi',
          email: 'yemi32@example.com',
          username: 'yemi32',
          password: `${hash}`,
          verified: true,
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    ),
  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
