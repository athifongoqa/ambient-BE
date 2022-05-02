const { build: buildApplication } = require('fastify-cli/helper');
const path = require('path');
const Fastify = require('fastify');
const jwt = require('../plugins/jwt');
const boom = require('boom');

const AppPath = path.join(__dirname, '../', 'app.js');

function config() {
  return {};
}

async function build() {
  try {
    const argv = [AppPath];

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
