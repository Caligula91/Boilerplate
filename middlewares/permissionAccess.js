const { User } = require('../models/user');
const error = require('./errorHandling/errorConstants');

/**
 * Ensure that requested User exists and is active
 */
module.exports.permissionAccess = () => async (req, res, next) => {
  try {
    const { _id: loggedInUser } = req.auth;

    const user = await User.findById(loggedInUser).lean();

    if (!user || !user.isActive) {
      throw new Error(error.NOT_FOUND);
    }

    req.user = user;
    return next();
  } catch (err) {
    return next(err);
  }
};
