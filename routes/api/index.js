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

    fastify.get('/user/:username', async function (req, reply) {
      const username = req.params.username
      let user = await User.findOne({username: username})
      reply.send({requestedUser: user})
    });

    fastify.post('/user', async (req, reply) => {
      let user = new User(req.body)
      let returnedUser = await user.save()
      reply.send({addedUser: returnedUser}) 
    });

    fastify.patch('/user/:id', async function (req, reply) {
      const id = req.params.id
      let updatedUser = await User.findByIdAndUpdate(id, req.body, {
         new: true
      })
      reply.send({updatedUser: updatedUser})
    });

    fastify.delete('/user/:id', async function (req, reply) {
      const id = req.params.id
      let deletedUser = await User.findByIdAndDelete(id)
      reply.send({message: `${deletedUser.id} has been deleted`})
    });
}