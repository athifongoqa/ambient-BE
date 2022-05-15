const { getSpotifyUser } = require('../../../controllers/oauth');

module.exports = async (fastify) => {
  fastify.post('/login', async (req, reply) => {
    const { accessToken } = await req.body;
    const user = await getSpotifyUser(accessToken);

    const userJWT = await fastify.signIn({ body: user });
    console.log('internal token', userJWT);
    reply.send({ internalJWT: userJWT });
  });
};
