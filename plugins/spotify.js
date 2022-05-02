'use strict'

const fp = require('fastify-plugin')
const oauthPlugin = require('fastify-oauth2')

module.exports = fp(async function (fastify, opts) {
  fastify.register(oauthPlugin, {
    name: 'Spotify',
    scope: ['user-read-email', 'user-read-private'],
    credentials: {
        client: {
            id: process.env.CLIENT_ID,
            secret: process.env.CLIENT_SECRET
    },
        auth: oauthPlugin.SPOTIFY_CONFIGURATION
  },
    // register a fastify url to start the redirect flow
    startRedirectPath: '/login/spotify',
    callbackUri: `http://0.0.0.0:3000/spotify/login/spotify/callback`
})
})