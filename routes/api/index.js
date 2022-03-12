'use strict'

const User = require('../../models/user')

module.exports = async function (fastify, opts) {
    fastify.register(require('fastify-prettier'),
    {
      alwaysOn: true
    });

    fastify.get('/users', async function (req, reply) {
      const users = await User.find()
      reply.send({allUsers: users})
    });

    // fastify.get('/user/:username', async function (req, reply) {
        
    // });

    fastify.post('/user', async (req, reply) => {
      let user = new User(req.body)
      let returnedUser = await user.save()
      reply.send({addedUser: returnedUser}) 
    });

    // fastify.patch('/user/:username', async function (req, reply) {
        
    // });

    // fastify.delete('/user/:username', async function (req, reply) {
        
    // });
}