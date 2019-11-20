const bcrypt = require('bcryptjs');
const { User } = require('../../../db/models');
const { handleSuccessResponse, OK } = require('../../util/success');
const { generateToken } = require('../../util/generateToken');
const {
  createError,
  NOT_FOUND,
  GENERIC_ERROR,
  BAD_REQUEST,
  FORBIDDEN,
} = require('../../util/error');

/**
 * Log existing user in
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const login = async (req, res, next) => {
  try {
    const credential = req.body;

    const user = await User.findOne({
      where: { username: credential.username },
    });

    // check if user does not exist
    if (!user) {
      return next(
        createError({
          message: 'User does not exist',
          status: NOT_FOUND,
        }),
      );
    }

    // check if user account not verified
    if (!user.verified) {
      return next(
        createError({
          message:
            'Please verify your account, using the link sent to your email',
          status: FORBIDDEN,
        }),
      );
    }

    const userHashedPassword = user.password;

    const isPasswordValid = await bcrypt.compare(
      credential.password,
      userHashedPassword,
    );

    if (!isPasswordValid) {
      return next(
        createError({
          message: 'Invalid username/password',
          status: BAD_REQUEST,
        }),
      );
    }

    const payload = {
      id: user.id,
    };

    const options = {
      expiresIn: '24h',
    };

    const token = generateToken(payload, options);

    // Remove user password from user object
    delete user.password;

    return res.status(OK).json(
      handleSuccessResponse({
        message: 'Log in successful',
        data: {
          firstName: user.firstName,
          role: user.role,
          token,
        },
      }),
    );
  } catch (error) {
    return next(
      createError({
        message: 'Could not log user in',
        status: GENERIC_ERROR,
      }),
    );
  }
};
module.exports = login;
