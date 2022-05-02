const { getAllAdmins, updateMemberToAdmin } = require('../../../controllers/admin')
const { getAdminsOpts, updateMemberToAdminOpts } = require('./schema')

module.exports = async function (fastify, opts) {
    fastify.register(require('fastify-prettier'), {
      alwaysOn: true,
    });

    fastify.route({
      method: "GET",
      url: "/",
      schema: getAdminsOpts,
      preValidation: [fastify.authenticate, fastify.isAdmin],
      handler: getAllAdmins
    });

    fastify.route({
      method: "PATCH",
      url: "/:username",
      schema: updateMemberToAdminOpts,
      preValidation: [fastify.authenticate, fastify.isAdmin],
      handler: updateMemberToAdmin
    });
};
  