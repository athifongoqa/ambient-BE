const request = require('supertest');
const { build } = require('../helper');
const db = require('../testdb');
const users = require('../../controllers/users');
const Fastify = require('fastify')
const jwt = require('../../plugins/jwt')
const user = require('../../controllers/users')

let app;
let fastify;

function createDummyUser(username, displayName, email, avatar, role) {
  return {
    username: username,
    displayName: displayName,
    email: email,
    avatar: avatar,
    role: role
  };
}

const userPayLoad = {
  _id: expect.any(String),
  username: 'dummyOne',
  displayName: 'Dumb',
  email: 'dummy123.dummy@code.berlin',
  avatar: 'img.ip/464558.jpg',
  role: 'member',
  followers: [],
  following: [],
};

admin_user = createDummyUser(
  'master',
  'master',
  'master.dummy@code.berlin',
  'img.ip/464558.jpg',
  'admin'
);

beforeAll(async () => {
  app = await build();
  await db.connect();
}, 15000);

beforeEach(async () => {
  fastify = Fastify()
  fastify.register(jwt)
  await fastify.ready()  
  await db.clearDatabase();
});

afterAll(async () => {
  app.close()
  await db.closeDatabase();
}, 30000);

describe('E2E Admin endpoints', () => {
  const dummy1 = createDummyUser(
    'dummyOne',
    'Dumb',
    'dummy123.dummy@code.berlin',
    'img.ip/464558.jpg',
    'member',
  );

  const dummy2 = createDummyUser(
    'dummyTwo',
    'Dumb Dumb',
    'dummy1234.dummy@code.berlin',
    'img.ip/464559.jpg',
    'member',
  );
  
  it('should GET all admin users', async () => {
    // Given  
    await users.addNewUser({body: dummy2})
    const adminAccessToken = await fastify.signIn({body: admin_user}).then(async (token) => {
      return token
    }).catch((err) => {
      return err
    })

    // When
    const { body, statusCode } = await request(app.server)
    .get('/api/admin/')
    .set({ Authorization: `Bearer ${adminAccessToken}` })
    
    // Then
    expect(statusCode).toBe(200);
    expect(body).toBeInstanceOf(Object);
    expect(body.allAdminUsers[0]).toMatchObject(admin_user);
  });

  it(`should UPDATE a single user's role from member to admin`, async () => {
    // Given
    const newUser = await user.addNewUser({ body: dummy2 });
    const adminAccessToken = await fastify.signIn({body: admin_user}).then(async (token) => {
      return token
    }).catch((err) => {
      return err
    })

    // When
    const { body, statusCode } = await request(app.server)
      .patch(`/api/admin/${newUser.username}`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    // Then
    expect(statusCode).toBe(200);
    expect(body).toBeInstanceOf(Object);
    expect(body.message).toMatch(`${newUser.username} has been updated to admin.`);
  });
});
