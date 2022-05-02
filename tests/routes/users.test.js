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

describe('E2E User endpoints', () => {
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
  
  it('should POST a single user', async () => {
    const adminAccessToken = await fastify.signIn({body: admin_user}).then(async (token) => {
      return token
    }).catch((err) => {
      return err
    })
    
    const { statusCode, body } = await request(app.server)
    .post('/api/users/')
    .send(dummy1)
    .set({ Authorization: `Bearer ${adminAccessToken}` });
    
    expect(statusCode).toBe(200);
    console.log(body)
    expect(body).toBeInstanceOf(Object);
    expect(body).toEqual(userPayLoad);
  });
  
  it('should GET all users', async () => {
    await users.addNewUser({body: dummy2})
    const adminAccessToken = await fastify.signIn({body: admin_user}).then(async (token) => {
      return token
    }).catch((err) => {
      return err
    })

    const { body, statusCode } = await request(app.server)
    .get('/api/users/')
    .set({ Authorization: `Bearer ${adminAccessToken}` })
    
    expect(statusCode).toBe(200);
    expect(body).toBeInstanceOf(Object);
    expect(body.allUsers[0]).toMatchObject(dummy2);
    expect(body.allUsers[1]).toMatchObject(admin_user);
  });
  
  it('should GET a single user', async () => {
    await user.addNewUser({ body: dummy1 });
    const adminAccessToken = await fastify.signIn({body: admin_user}).then(async (token) => {
      return token
    }).catch((err) => {
      return err
    })
    
    const { body, statusCode } = await request(app.server)
    .get(`/api/users/${dummy1.username}`)
    .set({ Authorization: `Bearer ${adminAccessToken}` })
    
    expect(statusCode).toBe(200);
    expect(body).toBeInstanceOf(Object);
    });
    
    it('should DELETE a single user', async () => {
      const newUser = await user.addNewUser({ body: dummy2 });
      const adminAccessToken = await fastify.signIn({body: admin_user}).then(async (token) => {
        return token
      }).catch((err) => {
        return err
      })

      const { body, statusCode } = await request(app.server)
      .delete(`/api/users/${newUser._id}`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });
      
      expect(statusCode).toBe(200);
      expect(body.message).toMatch(`${newUser._id} has been deleted`);
    
  });
  
  it('should UPDATE a single user', async () => {
    const newUser = await user.addNewUser({ body: dummy2 });
    const newDisplayName = 'Ronald';
    const adminAccessToken = await fastify.signIn({body: admin_user}).then(async (token) => {
      return token
    }).catch((err) => {
      return err
    })

    const { body, statusCode } = await request(app.server)
      .patch(`/api/users/${newUser._id}`)
      .send({ displayName: newDisplayName })
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(statusCode).toBe(200);
    expect(body.updatedUser.displayName).toMatch(newDisplayName);
  });
});
