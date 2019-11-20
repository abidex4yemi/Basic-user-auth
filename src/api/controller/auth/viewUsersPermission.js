const { User } = require('../../../db/models');
const { handleSuccessResponse, OK } = require('../../util/success');
const { createError, GENERIC_ERROR, NOT_FOUND } = require('../../util/error');

/**
 * Get user permission given a username
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getSingleUserPermission = async (req, res, next) => {
  try {
    const { username } = req;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return next({
        status: NOT_FOUND,
        message: 'User does not exist',
      });
    }

    return res.status(OK).json(
      handleSuccessResponse({
        message: 'user permission',
        data: { role: user.role },
      }),
    );
  } catch (error) {
    return next(
      createError({
        message: 'Could not get user permission',
        status: GENERIC_ERROR,
      }),
    );
  }
};

module.exports = getSingleUserPermission;
