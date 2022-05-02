const { build: buildApplication } = require('fastify-cli/helper');
const path = require('path');
const Fastify = require('fastify');
const jwt = require('../plugins/jwt');
const boom = require('boom');

const AppPath = path.join(__dirname, '../', 'app.js');

// Fill in this config with all the configurations
// needed for testing the application
function config() {
  return {};
}

// automatically build and tear down our instance
async function build() {
  try {
    // you can set all the options supported by the fastify CLI command
    const argv = [AppPath];

    // fastify-plugin ensures that all decorators
    // are exposed for testing purposes, this is
    // different from the production setup
    const app = await buildApplication(argv, config());
    return app;
  } catch (err) {
    throw boom.boomify(err);
  } 
}

const getAccessToken = async (user) => {
  try {
    const fastify = await Fastify();
    fastify.register(jwt);
    await fastify.ready();
    const token = await fastify.signIn({ body: user });
    return token;
  } catch (err) {
    throw boom.boomify(err);
  } 
};

module.exports = {
  config,
  build,
  getAccessToken,
};
