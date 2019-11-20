const { User } = require('../../../db/models');
const { handleSuccessResponse, CREATED } = require('../../util/success');
const {
  createError,
  GENERIC_ERROR,
  FORBIDDEN,
  BAD_REQUEST,
} = require('../../util/error');

/**
 * Verify user account
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const verifyUser = async (req, res, next) => {
  try {
    const { id, verificationToken } = req.params;

    const user = await User.findOne({ where: { id, verificationToken } });

    if (!user) {
      return next({
        status: FORBIDDEN,
        message: 'Verification token not valid',
      });
    }

    await user.update({
      verified: true,
      verificationToken: null,
    });

    return res.status(CREATED).json(
      handleSuccessResponse({
        message: 'Account successfully verified',
        data: [],
      }),
    );
  } catch (error) {
    if (error) {
      return next(
        createError({
          message: 'We could not verify your account, try later',
          status: BAD_REQUEST,
        }),
      );
    }

    return next(
      createError({
        message: 'oops! something went wrong, try again',
        status: GENERIC_ERROR,
      }),
    );
  }
};

module.exports = verifyUser;
