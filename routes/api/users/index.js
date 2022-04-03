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

  fastify.get("/:username", userController.getSingleUser);

  fastify.post("/", userController.addNewUser);

  fastify.patch("/:id", userController.updateSingleUser);

  fastify.delete("/:id", async function (req, reply) {
    const id = req.params.id;
    let deletedUser = await User.findByIdAndDelete(id);
    reply.send({ message: `${deletedUser.id} has been deleted` });
  });
};
