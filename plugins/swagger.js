const swagger = require('fastify-swagger');

const fp = require('fastify-plugin');

module.exports = fp(async (fastify) => {
  fastify.register(swagger, {
    routePrefix: '/docs',
    swagger: {
      info: {
        title: 'ambient',
        description: 'API Documentation for ambient',
        version: '0.1.0',
      },
      externalDocs: {
        url: 'https://github.com/athifongoqa/ambient-BE/',
        description: 'Check out the GitHub Repo',
      },
      host: 'localhost:3000/',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'show', description: 'Show related end-points' },
        { name: 'user', description: 'User related end-points' },
      ],
    },
    uiConfig: {
      deepLinking: false,
    },
    exposeRoute: true,
  });
});
