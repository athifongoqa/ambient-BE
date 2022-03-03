'use strict'

module.exports = async function (fastify, opts) {
    fastify.get('/login/spotify/callback', async function (req, reply) {
        const token = await fastify.Spotify.getAccessTokenFromAuthorizationCodeFlow(req)
      
        req.log.info('The Spotify token is %o', token)
        reply.send({ accessToken: token.access_token, refreshToken: token.refresh_token })
      })
}

