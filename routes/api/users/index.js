"use strict";
const userController = require("../../../controllers/users");

const User = require("../../../models/user");
const validator = require("validator");

module.exports = async function (fastify, opts) {
  fastify.register(require("fastify-prettier"), {
    alwaysOn: true,
  });

  fastify.get("/", async function (req, reply) {
    const users = await User.find();
    reply.send({ allUsers: users });
  });

  fastify.get("/:username", async function (req, reply) {
    const username = req.params.username;
    let user = await User.findOne({ username: username });
    reply.send({ requestedUser: user });
  });

  fastify.post("/", userController.addNewUser);

  fastify.patch("/:id", async function (req, reply) {
    const id = req.params.id;
    let updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    reply.send({ updatedUser: updatedUser });
  });

  fastify.delete("/:id", async function (req, reply) {
    const id = req.params.id;
    let deletedUser = await User.findByIdAndDelete(id);
    reply.send({ message: `${deletedUser.id} has been deleted` });
  });
};
