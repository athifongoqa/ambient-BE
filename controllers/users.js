const boom = require('boom');
const validator = require('validator');
const User = require('../models/user.model');

async function addNewUser(req, reply) {
  try {
    if (!validator.isEmail(req.body.email)) {
      return { message: 'Please use a valid email address.' };
    }

    const user = await User.findOne({username: req.body.username})
    if (user) {
      console.log('User exists')
      return user;
    }
    
    const newUser = new User(req.body);
    const returnedUser = await newUser.save();
    console.log('New user exists')
    return returnedUser
  } catch (err) {
    throw boom.boomify(err);
  }
}

async function getAllUsers(req, reply) {
  const users = await User.find();
  reply.send({ allUsers: users });
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
  reply.send({ updatedUser });
}

async function deleteSingleUser(req, reply) {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  reply.send({ message: `${deletedUser.id} has been deleted` });
}

module.exports = {
  addNewUser, getSingleUser, updateSingleUser, deleteSingleUser, getAllUsers,
};
