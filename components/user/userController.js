const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const { issueNewToken } = require('../../lib/jwtHandler');
const { customShortId } = require('../../lib/misc');
const { sendEmail, emailTemplates } = require('../../lib/emailHandler');
const error = require('../../middlewares/errorHandling/errorConstants');
const { JWT_SECRET } = require('../../config/environments');

/**
 * @api {post} /user/signin Sign in User
 * @apiVersion 1.0.0
 * @apiName Sign in User
 * @apiGroup User
 *
 * @apiBody {String} email Email
 * @apiBody {String} password Password
 *
 * @apiSuccessExample Success-Response:
 HTTP/1.1 200 OK
 {
   "message": "Successfully signed in",
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWFlNzAwMGJmZDgyNzNhYjI3ZDVmYTki",
   "results": {
     "_id": "59ae7000bfd8273ab27d5fa9",
     "updatedAt": "2017-09-05T09:36:00.581Z",
     "createdAt": "2017-09-05T09:36:00.581Z",
     "email": "user@email.com",
     "name": "Someone New",
     "__v": 0,
     "isActive": true
   }
 }
 * @apiUse MissingParamsError
 * @apiUse NotFound
 */
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error(error.MISSING_PARAMETERS);
  }

  const user = await User.findOne({ email: email.toLowerCase() }, {
    password: 1,
    isActive: 1,
  }).lean();

  if (!user) {
    throw new Error(error.NOT_FOUND);
  }

  if (!user.isActive) {
    throw new Error(error.FORBIDDEN);
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw new Error(error.CREDENTIALS_ERROR);
  }

  delete user.password;

  return res.status(200).send({
    message: 'Successfully signed in',
    token: issueNewToken(user),
    results: user,
  });
};

/**
 * @api {post} /user/forgot-password Forgot password
 * @apiVersion 1.0.0
 * @apiName Forgot password
 * @apiGroup User
 *
 * @apiBody {String} email Email
 *
 * @apiSuccessExample Success-Response:
 HTTP/1.1 200 OK
 {
   "message": "Successfully generated reset token"
 }
 * @apiUse MissingParamsError
 * @apiUse NotFound
 */
module.exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new Error(error.MISSING_PARAMETERS);
  }

  const resetToken = customShortId();
  const user = await User.findOne({ email: email.toLowerCase() }).lean();

  if (!user) {
    throw new Error(error.NOT_FOUND);
  }

  await User.updateOne({ email }, { resetToken });

  await sendEmail(
    email,
    'Reset Password',
    emailTemplates.forgotPassword({ resetToken }),
  );
  return res.status(200).send({
    message: 'Successfully generated reset token',
  });
};

/**
 * @api {post} /user/reset-password/:resetToken Reset password
 * @apiVersion 1.0.0
 * @apiName Reset password
 * @apiGroup User
 *
 * @apiParam {String} resetToken ResetToken
 * @apiBody {String} password New password
 * @apiBody {String} passwordConfirm New password Confirm
 *
 * @apiSuccessExample Success-Response:
 HTTP/1.1 200 OK
 {
   "message": "Password updated",
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
 }
 * @apiUse MissingParamsError
 * @apiUse NotFound
 * @apiUse InvalidValue
 */
module.exports.resetPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { password, passwordConfirm } = req.body;

  if (!password || !passwordConfirm || !resetToken) {
    throw new Error(error.MISSING_PARAMETERS);
  }

  if (password !== passwordConfirm) throw new Error(error.INVALID_VALUE);

  const newPassword = bcrypt.hashSync(password, 10);

  const user = await User.findOneAndUpdate(
    { resetToken },
    {
      $set: { password: newPassword },
      $unset: { resetToken: '' },
    },
    { new: true },
  );

  if (!user) {
    throw new Error(error.NOT_FOUND);
  }

  return res.status(200).send({
    message: 'Password updated',
    token: issueNewToken(user),
  });
};

/**
 * @api {post} /user/change-password Change password
 * @apiVersion 1.0.0
 * @apiName Change password
 * @apiGroup User
 *
 * @apiBody {String} oldPassword User's old password
 * @apiBody {String} newPassword User's new password to set to
 * @apiBody {String} newPasswordConfirm User's new password confirm
 *
 * @apiSuccessExample Success-Response:
 HTTP/1.1 200 OK
 {
   "message": "Password successfully updated",
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX..."
 }
 * @apiUse MissingParamsError
 * @apiUse CredentialsError
 * @apiUse InvalidValue
 */
module.exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword, newPasswordConfirm } = req.body;
  const { _id } = req.user;

  if (!oldPassword || !newPassword) {
    throw new Error(error.MISSING_PARAMETERS);
  }

  if (newPassword !== newPasswordConfirm) throw new Error(error.INVALID_VALUE);

  const user = await User.findOne({ _id }, { password: 1 }).lean();

  if (!bcrypt.compareSync(oldPassword, user.password)) {
    throw new Error(error.CREDENTIALS_ERROR);
  }

  const password = bcrypt.hashSync(newPassword, 10);
  await User.updateOne({ _id }, { password });

  return res.status(200).send({
    message: 'Password successfully updated',
    token: issueNewToken(user),
  });
};

/**
 * @api {get} /user/logged-user Get my profile
 * @apiVersion 1.0.0
 * @apiName Get my profile
 * @apiGroup User
 *
 * @apiSuccessExample Success-Response:
 HTTP/1.1 200 OK
 {
   "message": "Successfully returned profile",
   "results": {
     "_id": "59ae7000bfd8273ab27d5fa9",
     "updatedAt": "2017-09-05T09:36:00.581Z",
     "createdAt": "2017-09-05T09:36:00.581Z",
     "email": "user@email.com",
     "name": "Someone New",
     "__v": 0,
     "isActive": true
   }
 }
 */
module.exports.getProfile = async (req, res) => res.status(200).send({
  message: 'Successfully returned profile',
  results: req.user,
});

/**
 * @api {post} /user/refresh-token Refresh token
 * @apiVersion 1.0.0
 * @apiName refreshToken
 * @apiDescription Refresh token
 * @apiGroup User
 *
 * @apiBody {String} token User's expired token
 *
 * @apiSuccessExample Success-Response:
 HTTP/1.1 200 OK
 {
    "message": "Successfully refreshed token",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX..."
 }
 * @apiUse MissingParamsError
 * @apiUse NotFound
 */
module.exports.refreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    throw new Error(error.MISSING_PARAMETERS);
  }

  const decoded = jwt.decode(token, JWT_SECRET);

  if (decoded === null) {
    throw new Error(error.NOT_FOUND);
  }

  const user = await User.findOne({ _id: decoded._id }).lean();

  if (!user) {
    throw new Error(error.NOT_FOUND);
  }

  return res.status(200).send({
    message: 'Successfully refreshed token',
    token: issueNewToken(user),
  });
};
