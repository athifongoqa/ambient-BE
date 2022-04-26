const userController = require('../../controllers/users')
const axios = require('axios');

function createDummyUser(username, displayName, email, avatar) {
  return {
    username,
    displayName,
    email,
    avatar,
  };
}


module.exports = async function (fastify, opts) {
  fastify.get('/login/spotify/callback', async (req, reply) => {
    const token = await fastify.Spotify.getAccessTokenFromAuthorizationCodeFlow(req);

    // the token can be used to get the user data
    const userData = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        authorization: `${token.token_type} ${token.access_token}`
      }
    })

    const user = createDummyUser(
      userData.data.id,
      userData.data.display_name,
      userData.data.email,
      userData.data.images[0],
    )

    await userController.addNewUser({body: user})

    reply.send({ accessToken: token.access_token, refreshToken: token.refresh_token });
  });
};
