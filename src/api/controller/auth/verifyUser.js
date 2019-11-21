const { User } = require('../../../db/models');
const { handleSuccessResponse, OK } = require('../../util/success');
const {
  createError,
  GENERIC_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
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
        status: NOT_FOUND,
        message: 'User does not exist',
      });
    }

    await user.update({
      verified: true,
      verificationToken: null,
    });

    return res.status(OK).json(
      handleSuccessResponse({
        message: 'Account verified successfully',
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
