const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { emailRegExp } = require('../lib/misc');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, trim: true, required: true },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    match: [emailRegExp, 'Invalid email'],
    required: 'Please enter an email address',
  },
  password: { type: String, required: true, select: false },
  isActive: { type: Boolean, default: true },
  resetToken: String,
  activationCode: String,
}, {
  timestamps: true,
});

UserSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

module.exports = {
  User: mongoose.model('User', UserSchema),
};
