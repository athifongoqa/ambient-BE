/* eslint-disable no-underscore-dangle */
/* global before, beforeEach, after, it, describe */
const request = require('supertest');
const assert = require('assert');
const db = require('../testdb');
const Show = require('../../models/show.model');
const { build, getAccessToken } = require('../helper');
const { showInput, adminUser } = require('../dummyShows');

describe('shows integration tests', () => {
  let app;
  let adminAccessToken;

  before(async () => {
    app = await build();
    await db.connect();
    adminAccessToken = await getAccessToken(adminUser);
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
      .get('/api/shows/')
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    assert.equal(statusCode, 200);
    assert.equal(body.length, 0);
  });

  it('Get all shows when there are some', async () => {
    const show = new Show(showInput);
    await show.save();

    const { statusCode, body } = await request(app.server)
      .get('/api/shows/')
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    assert.equal(statusCode, 200);
    assert.equal(body.length, 1);
    assert.equal(body[0].name, showInput.name);
  });

  it('Get a single show', async () => {
    const show = new Show(showInput);
    const returnedShow = await show.save();

    const { statusCode, body } = await request(app.server)
      .get(`/api/shows/${returnedShow._id}`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    assert.equal(statusCode, 200);
    assert.equal(body.name, showInput.name);
  });

  it('Get a single show with non existing id', async () => {
    const show = new Show(showInput);
    await show.save();

    const { statusCode, body } = await request(app.server)
      .get('/api/shows/1234567890abcdef12345678')
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    assert.equal(statusCode, 404);
    assert.equal(body.message, 'Show not found');
  });

  it('Get a single show with invalid length id', async () => {
    const { statusCode, body } = await request(app.server)
      .get('/api/shows/123')
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    assert.equal(statusCode, 500);
    assert.equal(body.message, 'The server returned an error');
  });

  it('Create a show', async () => {
    const { statusCode, body } = await request(app.server)
      .post('/api/shows/')
      .send(showInput)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    assert.equal(statusCode, 201);
    assert.equal(body.name, showInput.name);
  });

  it('Update a show', async () => {
    const show = new Show(showInput);
    const returnedShow = await show.save();

    const { statusCode, body } = await request(app.server)
      .patch(`/api/shows/${returnedShow._id}`)
      .send({ name: 'Updated Show Name' })
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    assert.equal(statusCode, 200);
    assert.equal(body.name, 'Updated Show Name');
    assert.equal(body.creator_id, showInput.creator_id);
  });

  it('Update a show with non existing id', async () => {
    const show = new Show(showInput);
    await show.save();

    const { statusCode, body } = await request(app.server)
      .patch('/api/shows/1234567890abcdef12345678')
      .send({ name: 'Updated Show Name' })
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    assert.equal(statusCode, 404);
    assert.equal(body.message, 'Show not found');
  });

  it('Update a show with invalid length id', async () => {
    const { statusCode, body } = await request(app.server)
      .patch('/api/shows/123')
      .send({ name: 'Updated Show Name' })
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    assert.equal(statusCode, 500);
    assert.equal(body.message, 'The server returned an error');
  });

  it('Delete a show', async () => {
    const show = new Show(showInput);
    const returnedShow = await show.save();

    const { statusCode, body } = await request(app.server)
      .delete(`/api/shows/${returnedShow._id}`)
      .send()
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    assert.equal(statusCode, 200);
    assert.equal(body.message, `Show id ${returnedShow._id} deleted`);
  });
});
