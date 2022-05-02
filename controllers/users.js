const boom = require('boom');
const validator = require('validator');
const User = require('../models/user.model');

async function addNewUser(req, reply) {
  try {
    if (!validator.isEmail(req.body.email)) {
      return { message: 'Please use a valid email address.' };
    }

    const foundUser = await User.findOne({username: req.body.username})
    let user;

    if (foundUser) {
      user = foundUser
    } 

    if (!foundUser) {
      const newUser = new User(req.body);
      user = await newUser.save();
    }

    return user
  } catch (err) {
    throw boom.boomify(err);
  }
}

async function getAllUsers(req, reply) {
  try {
    const users = await User.find();
    reply.send({ allUsers: users });
  } catch (err) {
    throw boom.boomify(err);
  }
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
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    reply.send({ updatedUser });
  } catch (err) {
    throw boom.boomify(err);
  }
}

async function deleteSingleUser(req, reply) {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    reply.send({ message: `${deletedUser.id} has been deleted` });
  } catch (err) {
    throw boom.boomify(err);
  }
}

module.exports = {
  addNewUser, getSingleUser, updateSingleUser, deleteSingleUser, getAllUsers,
};
