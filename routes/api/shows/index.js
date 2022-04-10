const fastifyPrettier = require('fastify-prettier');
const {
  getShowsOpts,
  getShowOpts,
  postShowOpts,
  deleteShowOpts,
  updateShowOpts,
} = require('./schema');

module.exports = async function (fastify) {
  fastify.register(fastifyPrettier, {
    alwaysOn: true,
  });

  fastify.setErrorHandler(function (error, request, reply) {
    reply.code(500).send({ message: 'The server returned an error' });
  });

  fastify.get('/', getShowsOpts);

  fastify.get('/:id', getShowOpts);

  fastify.post('/', postShowOpts);

  fastify.delete('/:id', deleteShowOpts);

  fastify.put('/:id', updateShowOpts);
};
