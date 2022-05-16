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
  const baseApiUrl = '/api/shows';
  let authHeader;
  const validId = '1234567890abcdef12345678';
  const invalidId = '123';

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
    const { statusCode, body } = await request(app.server)
      .get(baseApiUrl)
      .set(authHeader);

    assert.equal(statusCode, 204);
    assert.deepEqual(body, {});
  });

  it('Get all shows when there are some', async () => {
    await addShowToDb();

    const { statusCode, body } = await request(app.server)
      .get(baseApiUrl)
      .set(authHeader);

    assert.equal(statusCode, 200);
    assert.equal(body.length, 1);
    assert.equal(body[0].name, showInput.name);
  });

  it('Get a single show', async () => {
    const returnedShow = await addShowToDb();

    const { statusCode, body } = await request(app.server)
      .get(`${baseApiUrl}/${returnedShow._id}`)
      .set(authHeader);

    assert.equal(statusCode, 200);
    assert.equal(body.name, showInput.name);
  });

  it('Get a single show with non existing id', async () => {
    await addShowToDb();

    const { statusCode, body } = await request(app.server)
      .get(`${baseApiUrl}/${validId}`)
      .set(authHeader);

    assert.equal(statusCode, 404);
    assert.equal(body.message, 'Show not found');
  });

  it('Get a single show with invalid length id', async () => {
    await addShowToDb();

    const { statusCode, body } = await request(app.server)
      .get(`${baseApiUrl}/${invalidId}`)
      .set(authHeader);

    assert.equal(statusCode, 500);
    assert.equal(body.message, 'The server returned an error');
  });

  it('Create a show', async () => {
    const { statusCode, body } = await request(app.server)
      .post(baseApiUrl)
      .send(showInput)
      .set(authHeader);

    assert.equal(statusCode, 201);
    assert.equal(body.name, showInput.name);
  });

  it('Update a show', async () => {
    const returnedShow = await addShowToDb();

    const { statusCode, body } = await request(app.server)
      .patch(`${baseApiUrl}/${returnedShow._id}`)
      .send({ name: 'Updated Show Name' })
      .set(authHeader);

    assert.equal(statusCode, 200);
    assert.equal(body.name, 'Updated Show Name');
    assert.equal(body.creator_id, showInput.creator_id);
  });

  it('Update a show with non existing id', async () => {
    await addShowToDb();

    const { statusCode, body } = await request(app.server)
      .patch(`${baseApiUrl}/${validId}`)
      .send({ name: 'Updated Show Name' })
      .set(authHeader);

    assert.equal(statusCode, 404);
    assert.equal(body.message, 'Show not found');
  });

  it('Update a show with invalid length id', async () => {
    await addShowToDb();

    const { statusCode, body } = await request(app.server)
      .patch(`${baseApiUrl}/${invalidId}`)
      .send({ name: 'Updated Show Name' })
      .set(authHeader);

    assert.equal(statusCode, 500);
    assert.equal(body.message, 'The server returned an error');
  });

  it('Delete a show', async () => {
    const returnedShow = await addShowToDb();

    const { statusCode, body } = await request(app.server)
      .delete(`${baseApiUrl}/${returnedShow._id}`)
      .send()
      .set(authHeader);

    assert.equal(statusCode, 200);
    assert.equal(body.message, `Show id ${returnedShow._id} deleted`);
  });
});
