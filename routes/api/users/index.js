const {
  addNewUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
} = require('../../../controllers/users');

const {
  getUsersOpts,
  getUserOpts,
  postUserOpts,
  deleteUserOpts,
  updateUserOpts,
} = require('./schema')

module.exports = async function (fastify, opts) {
  fastify.register(require('fastify-prettier'), {
    alwaysOn: true,
  });

  fastify.route({
    method: "GET",
    url: "/",
    schema: getUsersOpts,
    preValidation: [fastify.authenticate],
    handler: getAllUsers
  });

  fastify.route({
    method: "GET",
    url: "/:username",
    schema: getUserOpts,
    preValidation: [fastify.authenticate],
    handler: getSingleUser
  });

  fastify.route({
    method: "POST",
    url: "/",
    schema: postUserOpts,
    preValidation: [fastify.authenticate],
    handler: addNewUser
  });

  fastify.route({
    method: "PATCH",
    url: "/:id",
    schema: updateUserOpts,
    preValidation: [fastify.authenticate],
    handler: updateSingleUser
  });

  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: deleteUserOpts,
    preValidation: [fastify.authenticate],
    handler: deleteSingleUser
  });
};
