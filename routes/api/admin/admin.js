const User = require('../../../models/user.model');
const boom = require('boom');

module.exports = async function (fastify, opts) {
    fastify.register(require('fastify-prettier'), {
      alwaysOn: true,
    });
  
    fastify.get('/', {preValidation: [fastify.authenticate, fastify.isAdmin]}, async function (req, reply) {
        const adminUsers = await User.find({ role: 'admin' });
        reply.send({ allAdminUsers: adminUsers });
      });

    fastify.put('/:username', {preValidation: [fastify.authenticate, fastify.isAdmin]}, async function (req, reply) {
        const { username } = req.params;
        const newAdmin = await User.updateOne({username: username}, {role: 'admin'});
        reply.send({ newAdmin });
      });
  };
  