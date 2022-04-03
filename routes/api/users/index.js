"use strict";
const userController = require("../../../controllers/users");

module.exports = async function (fastify, opts) {
  fastify.register(require("fastify-prettier"), {
    alwaysOn: true,
  });

  fastify.get("/", userController.getAllUsers);

  fastify.get("/:username", userController.getSingleUser);

  fastify.post("/", userController.addNewUser);

  fastify.patch("/:id", userController.updateSingleUser);

  fastify.delete("/:id", userController.deleteSingleUser);
};
