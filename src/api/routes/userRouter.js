const express = require('express');
const { createUser, verifyUser } = require('../controller/auth');
const validateCreateUser = require('../middleware/validateCreateUser');

const userRouter = express.Router();

userRouter.route('/signup').post(validateCreateUser, createUser);
userRouter.route('/confirm/:id/:verificationToken').post(verifyUser);

module.exports = userRouter;
