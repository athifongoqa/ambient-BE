module.exports = async function (fastify) {
  fastify.get('/', async () => ({ root: true }));
};
