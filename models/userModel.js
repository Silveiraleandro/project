const mongoose = require('mongoose');
const validator = require('validator');
const authHelpers = require('./../helpers/auth');
const bcrypt = require('bcryptjs');

/*
* Note dont use arrow operator for the callbacks,
* which changes the scope of this.
*/


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
    select: false,
    minlength: [8, 'password must have more then 8 characters']
  },
  passwordConfirmation: {
    type: String,
    validate: {
      validator: function(val) { authHelpers.passwordConfirmed(this.password, val) },
      message: 'passwords dont match'
    },
    required: [true, 'need to confirm password']
  }
});

// MIDDLEWARE
userSchema.pre('save', async function(next) {
  // We don't want to hash the password if its already been hashed
  // i.e on user update operations
  if (!this.isModified('password')) return next();
  // hash the password
  this.password = await authHelpers.hashPassword(this.password);
  // We don't want to save the confirmation password
  // it's only needed for validation undefined means it wont be persisted
  this.passwordConfirmation = undefined;
  next()
});

// METHODS
userSchema.methods.isAuthenticated = async function(password, hashPassword) {
  return await bcrypt.compare(password, hashPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
