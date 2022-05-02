const path = require('path');
const AutoLoad = require('fastify-autoload');
const mongoose = require('mongoose');
const boom = require('boom');

module.exports = async function (fastify, opts) {
  try {
    await mongoose.connect(process.env.MONGODB);
    fastify.after((err) => {
      err ? console.log(err) : console.log('Database is connected.');
    });

    fastify.register(require('@fastify/cors'))
    fastify.register(require('@fastify/helmet'))
    fastify.register(require('fastify-formbody'))

    fastify.register(AutoLoad, {
      dir: path.join(__dirname, 'plugins'),
      options: { ...opts },
    });

    fastify.register(AutoLoad, {
      dir: path.join(__dirname, 'routes'),
      options: { ...opts },
    });
  } catch (err) {
    throw boom.boomify(err)
  }
};
