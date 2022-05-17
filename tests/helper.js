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
const { showInput, baseUrl, adminUser } = require('./dummyShows');

const adminAccessToken = process.env.ADMIN_ACCESS_TOKEN;

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
  const newShow = new Show(showInput);
  const returnedShow = await newShow.save();
  return returnedShow;
};

const startApp = async () => {
  const app = await build();
  await db.connect();
  return app;
};

const setAuthHeader = async (permToken) => {
  let token = permToken;
  if (!token) {
    token = await getAccessToken(adminUser);
  }
  const authHeader = { Authorization: `Bearer ${token}` };
  return authHeader;
};

const craftAuthRequest = async (app) => {
  const header = await setAuthHeader(adminAccessToken);
  const { server } = app;

  const authRequest = (method, url, data) =>
    request(server)
      [method](baseUrl + url)
      .set(header)
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
