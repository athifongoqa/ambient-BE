const boom = require('boom');
const validator = require('validator');
const User = require('../models/user.model');

async function addNewUser(req, reply) {
  try {
    if (!validator.isEmail(req.body.email)) {
      return { message: 'Please use a valid email address.' };
    }

    const user = new User(req.body);
    const returnedUser = await user.save();
    return returnedUser;
  } catch (err) {
    throw boom.boomify(err);
  }
}

async function getAllUsers(req, reply) {
  const users = await User.find();
  return users;
}

async function getSingleUser(req, reply) {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    return user;
  } catch (err) {
    throw boom.boomify(err);
  }
}

async function updateSingleUser(req, reply) {
  const { id } = req.params;
  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  return { message: `${updatedUser.id} has been updated` };
}

async function deleteSingleUser(req, reply) {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  return { message: `${deletedUser.id} has been deleted` };
}

module.exports = {
  addNewUser, getSingleUser, updateSingleUser, deleteSingleUser, getAllUsers,
};
