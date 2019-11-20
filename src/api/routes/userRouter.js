const express = require('express');
const {
  createUser,
  verifyUser,
  login,
  getSingleUserPermission,
} = require('../controller/auth');
const validateCreateUser = require('../middleware/validateCreateUser');
const validateLoginBody = require('../middleware/validateLoginBody');

const userRouter = express.Router();

userRouter.route('/signup').post(validateCreateUser, createUser);
userRouter.route('/confirm/:id/:verificationToken').post(verifyUser);
userRouter.route('/login').post(validateLoginBody, login);
userRouter.route('/permissions/:username').get(getSingleUserPermission);

module.exports = userRouter;
