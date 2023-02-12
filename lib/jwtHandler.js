const jwt = require('jsonwebtoken');
const environments = require('../config/environments');

/**
 * Returns a jwt-signed token
 * @param {*} user User ID
 */
module.exports.issueNewToken = (user) => jwt.sign({ _id: user._id }, environments.JWT_SECRET, { expiresIn: '12h' });
