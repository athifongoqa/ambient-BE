const User = require('../../../models/user.model');
const boom = require('boom');
const { getAllAdmins } = require('../../../controllers/admin')

module.exports = async function (fastify, opts) {
    fastify.register(require('fastify-prettier'), {
      alwaysOn: true,
    });
  
    fastify.get('/', {preValidation: [fastify.authenticate, fastify.isAdmin]}, getAllAdmins);

    fastify.patch('/:username', {preValidation: [fastify.authenticate, fastify.isAdmin]}, async function (req, reply) {
        try {
          const { username } = req.params;
          const newAdmin = await User.updateOne({username: username}, {role: 'admin'});
          reply.send({message: `${username} has been updated to admin.`});
        } catch (err) {
          throw boom.boomify(err);
        }
      });
  };
  