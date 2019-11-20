const express = require('express');
const { createUser } = require('../controller/auth');
const validateCreateUser = require('../middleware/validateCreateUser');

const userRouter = express.Router();

userRouter.route('/signup').post(validateCreateUser, createUser);

module.exports = userRouter;
