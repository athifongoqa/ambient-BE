"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("fastify-swagger"), {
    routePrefix: "/docs",
    swagger: {
      info: {
        title: "ambient",
        description: "Testing the Fastify swagger API",
        version: "0.1.0",
      },
      externalDocs: {
        url: "https://github.com/athifongoqa/ambient-BE/",
        description: "Check out the GitHub Repo",
      },
      host: "localhost:3000",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [
        { name: "user", description: "User related end-points" },
        { name: "show", description: "Show related end-points" },
        { name: "playlist", description: "Playlist related end-points" },
      ],
      definitions: {
        User: {
          type: "object",
          required: ["id", "email", "username"],
          properties: {
            id: { type: "string", format: "uuid" },
            username: { type: "string" },
            profile_pic: { type: "string", format: "url" },
            email: { type: "string", format: "email" },
            display_name: { type: "string" },
            accounts: {
              type: "object",
              properties: {
                spotify_url: { type: "string", format: "url" },
                twitter_url: { type: "string", format: "url" },
                tiktok_url: { type: "string", format: "url" },
                linktree_url: { type: "string", format: "url" },
                instagram_url: { type: "string", format: "url" },
              },
            },
          },
        },
      },
      securityDefinitions: {
        apiKey: {
          type: "apiKey",
          name: "apiKey",
          in: "header",
        },
      },
    },
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true,
  });
});
