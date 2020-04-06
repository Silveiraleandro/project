const User = require('./../models/userModel');
const catchErrorAsync = require('./../helpers/catchErrorAsync');

exports.register = catchErrorAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    status: 'created',
    data: user
  })
});

exports.login = catchErrorAsync(async (req, res, next) => {

})
