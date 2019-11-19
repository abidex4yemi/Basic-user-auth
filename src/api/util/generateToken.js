const jwt = require('jsonwebtoken');

/**
 * Generate token using provided payload.
 *
 * @param {*} payload
 * @param {*} options
 */
const generateToken = (payload = {}, options = {}) => {
  const secretKey = process.env.SECRET_KEY;

  const token = jwt.sign(payload, secretKey, options);

  return token;
};

module.exports = {
  generateToken,
};
