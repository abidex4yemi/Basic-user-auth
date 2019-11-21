module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      'users',
      [
        {
          id: 'eac8cd5b-5767-4cc4-bfca-f58408957b5f',
          firstName: 'Jane',
          lastName: 'Show',
          email: 'jane@example.com',
          username: 'jane32',
          password:
            '$2a$10$BZ5Ly19.iBrv/gUqlHDX.uApygY7PCX3PHTEQWpNoau0w/51u7v.6',
          verified: true,
          verificationToken: 'e202e7a3-14b1-43a2-9882-3b760b42b4dc',
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '846b3867-cac9-417d-be7c-1a81d8eec199',
          firstName: 'Shola',
          lastName: 'Snow',
          email: 'shola@example.com',
          username: 'shola',
          password:
            '$2a$10$BZ5Ly19.iBrv/gUqlHDX.uApygY7PCX3PHTEQWpNoau0w/51u7v.6',
          verificationToken: 'bdb1bb45-ae57-4978-92b2-6c73f5fa94d8',
          verified: true,
          role: 'normal_user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'ef0f459f-c2bd-4b7b-99c7-1e811c6e954b',
          firstName: 'Abidemi',
          lastName: 'Yemi',
          email: 'yemi32@example.com',
          username: 'yemi32',
          password:
            '$2a$10$BZ5Ly19.iBrv/gUqlHDX.uApygY7PCX3PHTEQWpNoau0w/51u7v.6',
          verificationToken: '449856a8-49d6-48d7-8453-2157509d5204',
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
