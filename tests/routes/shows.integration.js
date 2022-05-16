/* eslint-disable no-underscore-dangle */
/* global before, beforeEach, after, it, describe */
const request = require('supertest');
const assert = require('assert');
const db = require('../testdb');
const { build, getAccessToken, addShowToDb } = require('../helper');
const { adminUser, showInput } = require('../dummyShows');

describe('shows integration tests', () => {
  let app;
  let adminAccessToken;
  const baseApiUrl = '/api/shows/';
  let authHeader;
  const validId = '1234567890abcdef12345678';
  const invalidId = '123';

  const authRequest = {
    get: (url) =>
      request(app.server)
        .get(baseApiUrl + url)
        .set(authHeader),
    post: (body) =>
      request(app.server).post(baseApiUrl).set(authHeader).send(body),
    patch: (url, body) =>
      request(app.server)
        .patch(baseApiUrl + url)
        .set(authHeader)
        .send(body),
    delete: (url) =>
      request(app.server)
        .delete(baseApiUrl + url)
        .set(authHeader),
  };

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
    const { statusCode, body } = await authRequest.get('');

    assert.equal(statusCode, 204);
    assert.deepEqual(body, {});
  });

  it('Get all shows when there are some', async () => {
    await addShowToDb();

    const { statusCode, body } = await authRequest.get('');

    assert.equal(statusCode, 200);
    assert.equal(body.length, 1);
    assert.equal(body[0].name, showInput.name);
  });

  it('Get a single show', async () => {
    const returnedShow = await addShowToDb();

    const { statusCode, body } = await authRequest.get(returnedShow._id);

    assert.equal(statusCode, 200);
    assert.equal(body.name, showInput.name);
  });

  it('Get a single show with non existing id', async () => {
    await addShowToDb();

    const { statusCode, body } = await authRequest.get(validId);

    assert.equal(statusCode, 404);
    assert.equal(body.message, 'Show not found');
  });

  it('Get a single show with invalid length id', async () => {
    await addShowToDb();

    const { statusCode, body } = await authRequest.get(invalidId);

    assert.equal(statusCode, 500);
    assert.equal(body.message, 'The server returned an error');
  });

  it('Create a show', async () => {
    const { statusCode, body } = await authRequest.post(showInput);

    assert.equal(statusCode, 201);
    assert.equal(body.name, showInput.name);
  });

  it('Update a show', async () => {
    const returnedShow = await addShowToDb();

    const { statusCode, body } = await authRequest.patch(returnedShow._id, {
      name: 'Updated Show Name',
    });

    assert.equal(statusCode, 200);
    assert.equal(body.name, 'Updated Show Name');
    assert.equal(body.creator_id, showInput.creator_id);
  });

  it('Update a show with non existing id', async () => {
    await addShowToDb();

    const { statusCode, body } = await authRequest.patch(validId, {
      name: 'Updated Show Name',
    });

    assert.equal(statusCode, 404);
    assert.equal(body.message, 'Show not found');
  });

  it('Update a show with invalid length id', async () => {
    await addShowToDb();

    const { statusCode, body } = await authRequest.patch(invalidId, {
      name: 'Updated Show Name',
    });

    assert.equal(statusCode, 500);
    assert.equal(body.message, 'The server returned an error');
  });

  it('Delete a show', async () => {
    const returnedShow = await addShowToDb();

    const { statusCode, body } = await authRequest.delete(returnedShow._id);

    assert.equal(statusCode, 200);
    assert.equal(body.message, `Show id ${returnedShow._id} deleted`);
  });
});
