const {
  getUsersOpts, getUserOpts, postUserOpts, deleteUserOpts, updateUserOpts,
} = require('./schema');

module.exports = async function (fastify, opts) {
  fastify.register(require('fastify-prettier'), {
    alwaysOn: true,
  });

  fastify.get('/', getUsersOpts);

  fastify.get('/:username', getUserOpts);

  fastify.post('/', postUserOpts);

  fastify.patch('/:id', updateUserOpts);

  fastify.delete('/:id', deleteUserOpts);
};
