const User = require('../../../models/userModel');
const catchErrorAsync = require('../../../helpers/catchErrorAsync');
const authHelper = require('../../../helpers/auth');

exports.isAuthenticated = catchErrorAsync(async (req, res, next) => {
  if ( req.cookies.jwt ) {
    const jwt = req.cookies.jwt;

    const decoded = await authHelper.isValid(jwt);
    const currentUser = await User.findById(decoded.id);

    if( !currentUser ) { return next(); }

    res.locals.user = currentUser;
    next()
  }
});
