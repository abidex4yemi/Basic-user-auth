const jwt = require('jsonwebtoken');
const { User } = require('../../db/models');
const { createError, UNAUTHORIZED, GENERIC_ERROR } = require('../util/error');

/**
 * Verifies user provided token
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  const secretKey = process.env.SECRET_KEY;

  // check if token is provided
  if (!token) {
    return next(
      createError({
        status: UNAUTHORIZED,
        message: 'Unauthorized!, please login',
      }),
    );
  }

  try {
    // verify user provided token against existing token
    const decoded = jwt.verify(token, secretKey);

    const user = await User.findByPk(decoded.id);

    // check for valid app users
    if (!user) {
      return next(
        createError({
          status: 401,
          error: 'The token you provided is invalid',
        }),
      );
    }

    // makes user object available through request object
    req.user = user;

    return next();
  } catch (errors) {
    return next(
      createError({
        message: 'Could not verify token',
        status: GENERIC_ERROR,
      }),
    );
  }
};

module.exports = verifyToken;
