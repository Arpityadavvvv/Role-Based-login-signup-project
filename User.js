const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,  // Ensure that the username is unique
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure that the email is unique
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],  // Enforce roles
    default: 'user',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
