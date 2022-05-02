const User = require('../../../models/user.model');
const boom = require('boom');
const { getAllAdmins, updateMemberToAdmin } = require('../../../controllers/admin')

module.exports = async function (fastify, opts) {
    fastify.register(require('fastify-prettier'), {
      alwaysOn: true,
    });
  
    fastify.get('/', {preValidation: [fastify.authenticate, fastify.isAdmin]}, getAllAdmins);

    fastify.patch('/:username', {preValidation: [fastify.authenticate, fastify.isAdmin]}, updateMemberToAdmin);
  };
  