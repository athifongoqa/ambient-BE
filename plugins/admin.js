const fp = require("fastify-plugin")

module.exports = fp(async function(fastify, opts) {
  fastify.decorate("isAdmin", async function(req, reply) {
    try {
        if (req.user.role !== 'admin') {
            reply.send('You are not permitted to perform this request.')
        }
    } catch (err) {
      reply.send(`${err} - Server error, apologies for that`)
    }
  })
})