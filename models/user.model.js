const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  avatar: {
    type: String,
    default: '',
  },
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'following',
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'followers',
  }],
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
