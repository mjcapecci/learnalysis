const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  picture: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);
