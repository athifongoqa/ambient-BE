/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */
const { build: buildApplication } = require('fastify-cli/helper');
const path = require('path');
const Fastify = require('fastify');
const boom = require('boom');
const request = require('supertest');
const jwt = require('../plugins/jwt');
const Show = require('../models/show.model');
const db = require('./testdb');
const { showInput, baseApiUrl, adminUser } = require('./dummyShows');

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

const addShowInputToDb = async () => {
  const input = showInput;
  const newShow = new Show(input);
  const returnedShow = await newShow.save();
  return returnedShow;
};

const startApp = async () => {
  const app = await build();
  await db.connect();
  return app;
};

const setAuthHeader = async () => {
  const adminAccessToken = await getAccessToken(adminUser);
  const authHeader = { Authorization: `Bearer ${adminAccessToken}` };
  return authHeader;
};

const craftAuthRequest = async (app) => {
  const authHeader = await setAuthHeader();
  const authRequest = (method, url, data) =>
    request(app.server)
      [method](baseApiUrl + url)
      .set(authHeader)
      .send(data);
  return authRequest;
};

module.exports = {
  config,
  build,
  getAccessToken,
  addShowInputToDb,
  craftAuthRequest,
  startApp,
};
