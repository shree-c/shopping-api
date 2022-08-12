const User = require('../models/User');
// @desc    user login
// @route   POST /api/v1/auth/register
// @access  Public
exports.login = async function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new Error('include email and password'));
  }
  //querying for the user
  //include password
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new Error('wrong email or password'));
  }
  //password comparision
  if (!await user.compare(password)) {
    return next(new Error('wrong email or password'));
  }
  sendTokenResponse(user, res, 200);
};
//for sending token response
function sendTokenResponse(user, res, statusCode) {
  //create token
  const token = user.getSignedJwtToken();
  //cookie options
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000),
    httpOnly: true
  };
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    });
}