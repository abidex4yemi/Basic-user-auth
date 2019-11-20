const uuid = require('uuid');
const { User } = require('../../../db/models');
const { sendMail, mailContent } = require('../../util/email');
const { handleSuccessResponse, CREATED } = require('../../util/success');
const {
  createError,
  CONFLICT,
  GENERIC_ERROR,
  BAD_REQUEST,
} = require('../../util/error');

/**
 * Create new user
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const signUp = async (req, res, next) => {
  try {
    const verificationToken = uuid();

    const user = await User.create({ ...req.body, verificationToken });

    // handle user creation error
    if (!user) {
      return next(
        createError({
          message: 'Something went wrong, try again',
          status: BAD_REQUEST,
        }),
      );
    }

    const { id, firstName, lastName, email } = user;

    const messageBody = mailContent(id, firstName, lastName, verificationToken);

    const subject = 'Welcome to idea labs';

    const welcomeMessage = { email, subject, messageBody };

    sendMail(welcomeMessage);

    return res.status(CREATED).json(
      handleSuccessResponse({
        message:
          'Account created successfully, please check your email for account verification',
        body: [],
      }),
    );
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      if (error.fields.email) {
        return next(
          createError({
            message: 'Email already exist',
            status: CONFLICT,
          }),
        );
      }

      if (error.fields.username) {
        return next(
          createError({
            message: 'Username already exist',
            status: CONFLICT,
          }),
        );
      }
    }

    return next(
      createError({
        message: 'Could not create new user',
        status: GENERIC_ERROR,
      }),
    );
  }
};

module.exports = signUp;
