'use strict'

module.exports = async function (fastify, opts) {
    const collection = fastify.mongo.db.collection('users');

    fastify.get('/users', async function (req, reply) {
        const result = await collection.find().toArray()
        if (result.length === 0) {
            reply.send('No documents found')
        }
        reply.send({ users: result })
      });
}