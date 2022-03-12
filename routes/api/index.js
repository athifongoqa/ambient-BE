'use strict'

const User = require('../../models/user')
const validator = require('validator')

module.exports = async function (fastify, opts) {
    fastify.register(require('fastify-prettier'),
    {
      alwaysOn: true
    });

    fastify.get('/users', async function (req, reply) {
      const users = await User.find()
      reply.send({allUsers: users})
    });

    fastify.get('/users/:username', async function (req, reply) {
      const username = req.params.username
      let user = await User.findOne({username: username})
      reply.send({requestedUser: user})
    });

    fastify.post('/user', async (req, reply) => {
      
      if (!validator.isEmail(req.body.email)) {
        reply.send({message: 'Please use a valid email address.'})
        return
      }
      
      let user = new User(req.body)
      let returnedUser = await user.save()
      reply.send({addedUser: returnedUser}) 
    });

    fastify.patch('/users/:id', async function (req, reply) {
      const id = req.params.id
      let updatedUser = await User.findByIdAndUpdate(id, req.body, {
         new: true
      })
      reply.send({updatedUser: updatedUser})
    });

    fastify.delete('/users/:id', async function (req, reply) {
      const id = req.params.id
      let deletedUser = await User.findByIdAndDelete(id)
      reply.send({message: `${deletedUser.id} has been deleted`})
    });
}