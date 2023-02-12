const { name } = require('../../../package.json');
const environments = require('../../environments');

const PROJECT_NAME = name
  .toLowerCase()
  .trim()
  .replace(/[^A-Z0-9]+/ig, '_'); // Remove whitespace and symbols

/**
 * Return mongodb connection
 * @returns {String}
 */
module.exports.connectionString = () => {
  if (environments.NODE_ENV === 'test') {
    return `mongodb://localhost:27017/${PROJECT_NAME}_test`;
  }
  return process.env.MONGO_DB;
};
