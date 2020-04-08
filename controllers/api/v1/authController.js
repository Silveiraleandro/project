const User = require('../../../models/userModel');
const catchErrorAsync = require('../../../helpers/catchErrorAsync');
const serializers = require('../../../helpers/serializers');
const authHelper = require('../../../helpers/auth');

exports.register = catchErrorAsync(async (req, res, next) => {
  // make sure we only permit the fields we want
  // maybe later we have admin user and default user from the
  // same model
  const user = await User.create(
    await serializers.serializeUser(req.body)
  );
  const jwt = await authHelper.createToken(user.id);

  // send the cookie with the jwt back to the
  // browser, the browser will then send this
  // cookie back with all future requests for
  // resources * Cookie expiry is in milliseconds *
  res.cookie('jwt', jwt, authHelper.cookieOptions());

  // Don't send the the user password back
  user.password = undefined;

  res.status(201).json({
    status: 'created',
    data: {
      user
    }
  })
});

exports.login = catchErrorAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) { return next( new Error('password and email required'))}

  const user = await User.findOne({email: email}).select('+password');

  if (!user) { return next( new Error('no account registered'))}

  if (await user.isAuthenticated(password, user.password)) {
    const jwt = await authHelper.createToken(user.id);

    // send the cookie with the jwt back to the
    // browser, the browser will then send this
    // cookie back with all future requests for
    // resources * Cookie expiry is in milliseconds *
    res.cookie('jwt', jwt, authHelper.cookieOptions());

    // Don't send the the user password back
    user.password = undefined;

    res.status(200).json({
      status: 'authorized',
      data: {
        user
      }
    })
  } else {
    res.status(401).json({
      status: 'unauthorized',
      message: 'Password or email in correct'
    })
  }
});

exports.gaurd = catchErrorAsync(async (req, res, next) => {
  let jwt;
  let tokenPresent;
  // Grab the token from the header
  if (req.header('authorization')) jwt = req.header('authorization').split(' ')[1];
  // if no token present return error
  if (!jwt) { tokenPresent = false; } else { tokenPresent = true; }
  // is the token valid?
  const decoded = await authHelper.isValid(jwt);
  const currentUser = await User.findById(decoded.id);

  if( (tokenPresent && currentUser) ) {
    req.user = currentUser;
    next()
  } else {
    res.status(401).json({
      status: "error",
      message: "not authorized"
    });
  }
});
