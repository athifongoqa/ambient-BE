const fp = require("fastify-plugin")
const userController = require('../controllers/users')

module.exports = fp(async function(fastify, opts) {
  fastify.register(require("fastify-jwt"), {
    secret: process.env.JWT_SECRET
  })

  fastify.decorate("authenticate", async function(req, reply) {
    try {
      await req.jwtVerify()
    } catch (err) {
      reply.send(`${err} - Please log in`)
    }
  })

  fastify.decorate("signIn", async function(req, reply) {
    try {
        // add/find user
        const token = await userController.addNewUser({body: req.body})
        .then(user => {
            // sign jwt with their id
            let token = fastify.jwt.sign({ _id: user._id, role: user.role})
            // return jwt token
            return token
        })
        return token
    } catch (err) {
        return err
    }
  })
})