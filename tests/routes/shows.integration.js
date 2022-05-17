/* eslint-disable no-underscore-dangle */
/* global before, beforeEach, after, it, describe */
const request = require('supertest');
const assert = require('assert');
const db = require('../testdb');
const { build, getAccessToken, addShowToDb } = require('../helper');
const {
  adminUser,
  showInput,
  invalidId,
  validId,
  baseApiUrl,
} = require('../dummyShows');

describe('shows integration tests', () => {
  let app;
  let path;
  let data;
  let adminAccessToken;
  let authHeader;

  const authRequest = (method, url = path, body = data) =>
    request(app.server)
      [method](baseApiUrl + url)
      .set(authHeader)
      .send(body);

  before(async () => {
    app = await build();
    await db.connect();
    adminAccessToken = await getAccessToken(adminUser);
    authHeader = { Authorization: `Bearer ${adminAccessToken}` };
  });

  beforeEach(async () => {
    await db.clearDatabase();
  });

  after(async () => {
    await db.closeDatabase();
    await app.close();
  });

  it('Get all shows when there is none', async () => {
    path = '/';
    const { statusCode, body } = await authRequest('get', path);

    assert.equal(statusCode, 204);
    assert.deepEqual(body, {});
  });

  it('Get all shows when there are some', async () => {
    await addShowToDb();

    path = '/';
    const { statusCode, body } = await authRequest('get', path);

    assert.equal(statusCode, 200);
    assert.equal(body.length, 1);
    assert.equal(body[0].name, showInput.name);
  });

  it('Get a single show', async () => {
    const returnedShow = await addShowToDb();

    path = `/${returnedShow._id}`;
    const { statusCode, body } = await authRequest('get', path);

    assert.equal(statusCode, 200);
    assert.equal(body.name, showInput.name);
  });

  it('Get a single show with non existing id', async () => {
    await addShowToDb();

    path = `/${validId}`;
    const { statusCode, body } = await authRequest('get', path);

    assert.equal(statusCode, 404);
    assert.equal(body.message, 'Show not found');
  });

  it('Get a single show with invalid length id', async () => {
    await addShowToDb();

    path = `/${invalidId}`;
    const { statusCode, body } = await authRequest('get', path);

    assert.equal(statusCode, 500);
    assert.equal(body.message, 'The server returned an error');
  });

  it('Create a show', async () => {
    path = '/';
    data = showInput;
    const { statusCode, body } = await authRequest('post', path, data);

    assert.equal(statusCode, 201);
    assert.equal(body.name, showInput.name);
  });

  it('Update a show', async () => {
    const returnedShow = await addShowToDb();

    path = `/${returnedShow._id}`;
    data = { name: 'Updated Show Name' };
    const { statusCode, body } = await authRequest('patch', path, data);

    assert.equal(statusCode, 200);
    assert.equal(body.name, 'Updated Show Name');
    assert.equal(body.creator_id, showInput.creator_id);
  });

  it('Update a show with non existing id', async () => {
    await addShowToDb();

    path = `/${validId}`;
    data = { name: 'Updated Show Name' };
    const { statusCode, body } = await authRequest('patch', path, data);

    assert.equal(statusCode, 404);
    assert.equal(body.message, 'Show not found');
  });

  it('Update a show with invalid length id', async () => {
    await addShowToDb();

    path = `/${invalidId}`;
    data = { name: 'Updated Show Name' };
    const { statusCode, body } = await authRequest('patch', path, data);

    assert.equal(statusCode, 500);
    assert.equal(body.message, 'The server returned an error');
  });

  it('Delete a show', async () => {
    const returnedShow = await addShowToDb();

    path = `/${returnedShow._id}`;
    const { statusCode, body } = await authRequest('delete', path);

    assert.equal(statusCode, 200);
    assert.equal(body.message, `Show id ${returnedShow._id} deleted`);
  });
});
