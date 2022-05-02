const User = require('../../../models/user.model');
const boom = require('boom');
const { getAllAdmins, updateMemberToAdmin } = require('../../../controllers/admin')

module.exports = async function (fastify, opts) {
    fastify.register(require('fastify-prettier'), {
      alwaysOn: true,
    });

    fastify.route({
      method: "GET",
      url: "/",
      preValidation: [fastify.authenticate, fastify.isAdmin],
      handler: getAllAdmins
    });

    fastify.route({
      method: "PATCH",
      url: "/:username",
      preValidation: [fastify.authenticate, fastify.isAdmin],
      handler: updateMemberToAdmin
    });
};
  