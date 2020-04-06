const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    maxlength: [255, 'name cannot exceed 255 characters'],
    validate: [validator.isAlpha, 'name must only contain letters'],
    required: [true, 'all users must have a first name']
  },
  lastName: {
    type: String,
    trim: true,
    validate: [validator.isAlpha, 'last name must only contain letters'],
    maxlength: [255, 'last name cannot exceed 255 characters'],
    required: [true, 'all users must have a last name']
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    maxlength: [255, 'email cannot exceed 255 characters'],
    validate: [validator.isEmail, 'email must be in correct email format'],
    required: [true, 'all users must have an email']
  },
  password: {
    type: String,
    required: [true, 'user must have a password'],
    minlength: [8, 'password must have more then 8 characters']
  },
  passwordConfirmation: {
    type: String,
    validate: {
      validator: function(passConfirm) {
        return passConfirm === this.password;
      }
    },
    required: [true, 'need to confirm password']
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
