const fastifyPrettier = require('fastify-prettier');
const {
  getShowsOpts,
  getShowOpts,
  postShowOpts,
  deleteShowOpts,
  updateShowOpts,
} = require('./schema');

const {
  getShow,
  getShows,
  createShow,
  deleteShow,
  updateShow,
} = require('../../../controllers/shows');

module.exports = async function (fastify) {
  fastify.register(fastifyPrettier, {
    alwaysOn: true,
  });

  fastify.setErrorHandler((error, request, reply) => {
    reply.code(500).send({ message: 'The server returned an error' });
  });

  fastify.route({
    method: 'GET',
    url: '/',
    schema: getShowsOpts,
    preValidation: [fastify.authenticate],
    handler: getShows,
  });

  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: getShowOpts,
    preValidation: [fastify.authenticate],
    handler: getShow,
  });

  fastify.route({
    method: 'POST',
    url: '/',
    schema: postShowOpts,
    preValidation: [fastify.authenticate],
    handler: createShow,
  });

  fastify.route({
    method: 'PATCH',
    url: '/:id',
    schema: updateShowOpts,
    preValidation: [fastify.authenticate],
    handler: updateShow,
  });

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: deleteShowOpts,
    preValidation: [fastify.authenticate],
    handler: deleteShow,
  });
};
