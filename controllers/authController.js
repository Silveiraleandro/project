const User = require('./../models/userModel');
const catchErrorAsync = require('./../helpers/catchErrorAsync');
const serializers = require('./../helpers/serializers');
const auth = require('./../helpers/auth');

exports.register = catchErrorAsync(async (req, res, next) => {
  // make sure we only permit the fields we want
  // maybe later we have admin user and default user from the
  // same model
  const user = await User.create(
    await serializers.serializeUser(req.body)
  );
  const jwt = await auth.createToken(user.id);

  res.status(201).json({
    status: 'created',
    jwt,
    data: user
  })
});

exports.login = catchErrorAsync(async (req, res, next) => {

})
