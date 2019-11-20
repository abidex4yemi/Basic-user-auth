const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const { User } = require('../../../db/models');
const { sendMail, mailContent } = require('../../util/email');
const { handleSuccessResponse, CREATED } = require('../../util/success');
const { createError, CONFLICT, GENERIC_ERROR } = require('../../util/error');

/**
 * Create new user
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createUser = async (req, res, next) => {
  try {
    // Todo: user account verification token should expired within a time frame

    const verificationToken = uuid();

    // Hash password
    req.body.password = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10),
    );

    // normalized as default user
    req.body.role = 'normal_user';

    const user = await User.create({
      ...req.body,
      verificationToken,
    });

    const { id, firstName, lastName, email } = user;

    const messageBody = mailContent({
      id,
      firstName,
      lastName,
      verificationToken,
    });

    const subject = 'Welcome to idea labs';

    const welcomeMessage = { email, subject, messageBody };

    sendMail(welcomeMessage);

    return res.status(CREATED).json(
      handleSuccessResponse({
        message:
          'Account created successfully, please check your email for account verification',
        data: [],
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

module.exports = createUser;
