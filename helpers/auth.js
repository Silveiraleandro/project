const { promisify } = require('util');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.passwordConfirmed = (pass, passConfirm) => {
  return pass === passConfirm;
};

exports.hashPassword = async (password) => {
  return bcrypt.hash(password, 11);
};

exports.createToken = async (payload) => {
  return await jwt.sign(
    { id: payload },
    process.env.SECRETE_KEY_BASE, {
      expiresIn: process.env.JWT_EXPIRES
    });
};

exports.isValid = async (token) => {
  return promisify(jwt.verify(token, process.env.SECRETE_KEY_BASE));
};

exports.cookieOptions = () => {
  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60),
    httpOnly: true
  };
  // Only set the secure option in production otherwise development wont work
  if (process.env.NODE_ENV === 'production') options.secure = true;

  return options
};
