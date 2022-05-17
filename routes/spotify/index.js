const axios = require('axios');

module.exports = async function (fastify, opts) {  
  fastify.get('/login/spotify/callback', returnAllTokens);

  function formatUser(username, displayName, email, avatar) {
      return {
        username,
        displayName,
        email,
        avatar,
      };
    }

  async function returnAllTokens(req, reply) {
      const token = await fastify.Spotify.getAccessTokenFromAuthorizationCodeFlow(req);

      const userData = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          authorization: `${token.token_type} ${token.access_token}`
        }
      })

      const user = formatUser(
        userData.data.id,
        userData.data.display_name,
        userData.data.email,
        userData.data.images[0],
      )
      
      const userJWT = await fastify.signIn({body: user})

      reply.send({ SpotifyAccessToken: token.access_token, SpotifyRefreshToken: token.refresh_token, internalJWT: userJWT });
  }
};
