const { returnAllTokens } = require('../../controllers/oauth')

module.exports = async function (fastify, opts) {  
  fastify.get('/login/spotify/callback', returnAllTokens);
};
