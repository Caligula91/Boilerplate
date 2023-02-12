const bunyan = require('bunyan');

// eslint-disable-next-line no-useless-escape
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Email validation
 * @param email
 * @returns {boolean}
 */
const validateEmail = (email) => emailRegExp.test(email);

/**
 * Check if given id is valid ObjectId
 * @param id
 * @returns {boolean}
 */
const isValidId = (id) => {
  if (!id) {
    return false;
  }
  return !!id.toString().match(/^[0-9a-fA-F]{24}$/);
};

/**
 * Return custom short ID with 6 digit
 * @param {Number} idLength length of the ID
 * @returns {string}
 */
const customShortId = (idLength = 6) => {
  const numbers = '0123456789';
  let data = '';
  for (let i = 0; i < idLength; i += 1) {
    data += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return data;
};

/**
 * Error logger
 * @param req
 * @param err
 */
const logError = (req, err) => {
  const logger = bunyan.createLogger({
    name: err && err.name ? err.name : 'unknown',
    streams: [
      {
        level: 'error',
        path: 'error.log',
      },
    ],
  });
  logger.error({ req, error: err.toString() });
};

module.exports = {
  validateEmail,
  emailRegExp,
  customShortId,
  logError,
  isValidId,
};
