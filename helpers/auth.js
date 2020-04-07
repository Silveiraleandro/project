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
