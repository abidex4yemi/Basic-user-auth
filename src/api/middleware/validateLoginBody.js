const Joi = require('@hapi/joi');
const joiValidate = require('../util/validate');

/**
 * Users login validation schema
 */
const loginSchema = Joi.object().keys({
  password: Joi.string()
    .min(6)
    .max(30)
    .label('Password')
    .trim()
    .required(),
  username: Joi.string()
    .label('Username')
    .trim()
    .required(),
});

/**
 * Validate login body against defined schema
 */
const validateLoginBody = (req, res, next) => {
  joiValidate(req, res, next, loginSchema);
};

module.exports = validateLoginBody;
