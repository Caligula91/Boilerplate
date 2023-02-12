const nodemailer = require('nodemailer');
const { NODE_ENV } = require('../config/environments');

/**
 * Send Email
 * @param {String[]} recipients Array of email strings, ex: ['john@edu.com', 'michael@gmail.com']
 * @param {String} subject Email Subject to appear in email
 * @param {String[]} text Email body message
 * @param {String[]} title Email title
 * @param {Object[]} [attachments] Optional attachments for email to send
 * @returns {Promise}
 */
function sendEmail(recipients, subject, text, title, attachments) {
  if (NODE_ENV === 'test') {
    return Promise.resolve();
  }

  if (NODE_ENV === 'production') {
    // Send real emails in production
  } else {
    // Send fake email in development using external virutal email services
  }
}

const emailTemplates = {
  confirmationEmail: (params) => (
    ''
  ),
  forgotPassword: (params) => (
    ''
  ),
};

module.exports = {
  sendEmail,
  emailTemplates,
};
