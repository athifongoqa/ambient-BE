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

  // Get all shows
  fastify.get('/', getShowsOpts);

  // Get single show
  fastify.get('/:id', getShowOpts);

  // Create a new show
  fastify.post('/', postShowOpts);

  // Delete a show
  fastify.delete('/:id', deleteShowOpts);

  // Update a show
  fastify.put('/:id', updateShowOpts);
};
