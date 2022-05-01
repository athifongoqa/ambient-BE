/* eslint no-unused-expressions: ["error", { "allowTernary": true }] */
const path = require('path');
const AutoLoad = require('fastify-autoload');
const mongoose = require('mongoose');

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  await mongoose.connect(process.env.MONGODB);
  fastify.after((err) => {
    // eslint-disable-next-line no-console
    err ? console.log(err) : console.log('MongoDB Plugin is ready.');
  });
  fastify.register(require('@fastify/cors'))
  fastify.register(require('@fastify/helmet'))
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: { ...opts },
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: { ...opts },
  });
};
