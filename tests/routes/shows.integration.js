const request = require('supertest');
const assert = require('assert');
const Fastify = require('fastify');
const db = require('../testdb');
const Show = require('../../models/show.model');
const { build } = require('../helper');
const jwt = require('../../plugins/jwt');
const { showInput, adminUser } = require('../dummyShows');

describe('shows integration tests', () => {
  let app;
  let fastify;
  const dummyToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTE0MDUyMzJ9.jVpKuWbJOrMRYMlYpeQh5RU__7fx4ZC94T8V3kYZtk8';

  before(async () => {
    app = await build();
    await db.connect();
    fastify = Fastify();
    fastify.register(jwt);
    await fastify.ready();
  });

  beforeEach(async () => {
    await db.clearDatabase();
  });

  after(async () => {
    await db.closeDatabase();
    await app.close();
  });

  it('Get all shows when there is none', async () => {
    // let adminAccessToken;
    // fastify.signIn({ body: adminUser }).then(async (token) => {
    //   adminAccessToken = token;
    // });
    const { statusCode, body } = await request(app.server)
      .get('/api/shows/')
      .set({ Authorization: `Bearer ${dummyToken}` });

    assert.equal(statusCode, 200);
    assert.equal(body.length, 0);
  });

  it('Get all shows when there are some', async () => {
    // let adminAccessToken;
    // fastify.signIn({ body: adminUser }).then(async (token) => {
    //   adminAccessToken = token;
    // });
    const show = new Show(showInput);
    await show.save();

    const { statusCode, body } = await request(app.server)
      .get('/api/shows/')
      .set({ Authorization: `Bearer ${dummyToken}` });

    assert.equal(statusCode, 200);
    assert.equal(body.length, 1);
    assert.equal(body[0].name, showInput.name);
  });

  it('Get a single show', async () => {
    // let adminAccessToken;
    // fastify.signIn({ body: adminUser }).then(async (token) => {
    //   adminAccessToken = token;
    // });

    const show = new Show(showInput);
    const returnedShow = await show.save();

    const { statusCode, body } = await request(app.server)
      .get(`/api/shows/${returnedShow._id}`)
      .set({ Authorization: `Bearer ${dummyToken}` });

    assert.equal(statusCode, 200);
    assert.equal(body.name, showInput.name);
  });

  it('Get a single show with non existing id', async () => {
    // let adminAccessToken;
    // fastify.signIn({ body: adminUser }).then(async (token) => {
    //   adminAccessToken = token;
    // });
    const show = new Show(showInput);
    await show.save();

    const { statusCode, body } = await request(app.server)
      .get(`/api/shows/1234567890abcdef12345678`)
      .set({ Authorization: `Bearer ${dummyToken}` });

    assert.equal(statusCode, 404);
    assert.equal(body.message, 'Show not found');
  });

  it('Get a single show with invalid length id', async () => {
    // let adminAccessToken;
    // fastify.signIn({ body: adminUser }).then(async (token) => {
    //   adminAccessToken = token;
    // });
    const { statusCode, body } = await request(app.server)
      .get('/api/shows/123')
      .set({ Authorization: `Bearer ${dummyToken}` });

    assert.equal(statusCode, 500);
    assert.equal(body.message, 'The server returned an error');
  });

  it('Create a show', async () => {
    // let adminAccessToken;
    // fastify.signIn({ body: adminUser }).then(async (token) => {
    //   adminAccessToken = token;
    // });
    const { statusCode, body } = await request(app.server)
      .post('/api/shows/')
      .send(showInput)
      .set({ Authorization: `Bearer ${dummyToken}` });

    assert.equal(statusCode, 201);
    assert.equal(body.name, showInput.name);
  });

  it('Update a show', async () => {
    // let adminAccessToken;
    // fastify.signIn({ body: adminUser }).then(async (token) => {
    //   adminAccessToken = token;
    // });
    const show = new Show(showInput);
    const returnedShow = await show.save();

    const { statusCode, body } = await request(app.server)
      .patch(`/api/shows/${returnedShow._id}`)
      .send({ name: 'Updated Show Name' })
      .set({ Authorization: `Bearer ${dummyToken}` });

    assert.equal(statusCode, 200);
    assert.equal(body.name, 'Updated Show Name');
    assert.equal(body.creator_id, showInput.creator_id);
  });

  it('Update a show with non existing id', async () => {
    // let adminAccessToken;
    // fastify.signIn({ body: adminUser }).then(async (token) => {
    //   adminAccessToken = token;
    // });
    const show = new Show(showInput);
    await show.save();

    const { statusCode, body } = await request(app.server)
      .patch(`/api/shows/1234567890abcdef12345678`)
      .send({ name: 'Updated Show Name' })
      .set({ Authorization: `Bearer ${dummyToken}` });

    assert.equal(statusCode, 404);
    assert.equal(body.message, 'Show not found');
  });

  it('Update a show with invalid length id', async () => {
    // let adminAccessToken;
    // fastify.signIn({ body: adminUser }).then(async (token) => {
    //   adminAccessToken = token;
    // });
    const { statusCode, body } = await request(app.server)
      .patch('/api/shows/123')
      .send({ name: 'Updated Show Name' })
      .set({ Authorization: `Bearer ${dummyToken}` });

    assert.equal(statusCode, 500);
    assert.equal(body.message, 'The server returned an error');
  });

  it('Delete a show', async () => {
    // let adminAccessToken;
    // fastify.signIn({ body: adminUser }).then(async (token) => {
    //   adminAccessToken = token;
    // });
    const show = new Show(showInput);
    const returnedShow = await show.save();

    const { statusCode, body } = await request(app.server)
      .delete(`/api/shows/${returnedShow._id}`)
      .send()
      .set({ Authorization: `Bearer ${dummyToken}` });

    assert.equal(statusCode, 200);
    assert.equal(body.message, `Show id ${returnedShow._id} deleted`);
  });
});
