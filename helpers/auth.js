const bcrypt = require('bcryptjs');

exports.passwordConfirmed = (pass, passConfirm) => {
  console.dir(pass + "------" + passConfirm);
  return pass === passConfirm;
};

exports.hashPassword = async (password) => {
  return bcrypt.hash(password, 11);
};
