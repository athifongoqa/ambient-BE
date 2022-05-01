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
  role: {
    type: String,
    required: true,
    default: 'member',
  },
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'following',
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'followers',
  }],
},{
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
