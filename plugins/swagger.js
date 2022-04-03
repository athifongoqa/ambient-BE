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
        { name: 'user', description: 'User related end-points' },
        { name: 'show', description: 'Show related end-points' },
        { name: 'playlist', description: 'Playlist related end-points' },
      ],
      definitions: {
        User: {
          type: 'object',
          required: ['id', 'email', 'username'],
          properties: {
            id: { type: 'string', format: 'uuid' },
            username: { type: 'string' },
            profile_pic: { type: 'string', format: 'hostname' },
            email: { type: 'string', format: 'email' },
            display_name: { type: 'string' },
            accounts: {
              type: 'object',
              properties: {
                spotify_url: { type: 'string', format: 'uri' },
                twitter_url: { type: 'string', format: 'uri' },
                tiktok_url: { type: 'string', format: 'uri' },
                linktree_url: { type: 'string', format: 'uri' },
                instagram_url: { type: 'string', format: 'uri' },
              },
            },
          },
        },
      },
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header',
        },
      },
    },
    uiConfig: {
      // docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: (request, reply, next) => {
        next();
      },
      preHandler: (request, reply, next) => {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true,
  });
});
