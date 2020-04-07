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
  const { email, password } = req.body;

  if (!email || !password) { return next( new Error('password and email required'))}

  const user = await User.findOne({email: email}).select('+password');

  if (await user.isAuthenticated(password, user.password)) {
    jwt = await auth.createToken(user.id);
    res.status(200).json({
      status: 'authorized',
      jwt
    })
  } else {
    res.status(401).json({
      status: 'unauthorized',
      message: 'Password or email in correct'
    })
  }
});
