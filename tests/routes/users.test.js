const request = require('supertest');
const { build } = require('../helper');
const db = require('../testdb');
const users = require('../../controllers/users');
const Fastify = require('fastify')
const jwt = require('../../plugins/jwt')
const user = require('../../controllers/users')

let app;
let fastify;

function createDummyUser(username, displayName, email, avatar) {
  return {
    username,
    displayName,
    email,
    avatar,
  };
}

const userPayLoad = {
  _id: expect.any(String),
  username: 'athiF',
  displayName: 'Athi F',
  email: 'dummy123.dummy@code.berlin',
  avatar: 'img.ip/464558.jpg',
  followers: [],
  following: [],
};

admin_user = createDummyUser(
  'athi',
  'Athi',
  'dummy12.dummy@code.berlin',
  'img.ip/464558.jpg',
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
    'athiF',
    'Athi F',
    'dummy123.dummy@code.berlin',
    'img.ip/464558.jpg',
  );

  const dummy2 = createDummyUser(
    'athiFo',
    'Athi Fo',
    'dummy1234.dummy@code.berlin',
    'img.ip/464559.jpg',
  );
  
  it('should POST a single user', async () => {
    let admin_access_token
    fastify.signIn({body: admin_user}).then(async (token) => {
      admin_access_token = token
      
      // When (Only 1 operation)
      const { statusCode, body } = await request(app.server)
      .post('/api/users/')
      .send(dummy1)
      .set({ Authorization: `Bearer ${admin_access_token}` });
      
      // Then
      expect(statusCode).toBe(200);
      expect(body).toBeInstanceOf(Object);
      expect(body).toMatchObject(userPayLoad);
    }).catch((err) => {
      return err
    })

  });
  
  it('should GET all users', async () => {
    // Given  
    let admin_access_token;
    await users.addNewUser({body: dummy2})
    fastify.signIn({body: admin_user})
    .then(async (token) => {
      admin_access_token = token

      // When
      const { body, statusCode } = await request(app.server)
      .get('/api/users/')
      .set({ Authorization: `Bearer ${admin_access_token}` })
      
      // Then
      expect(statusCode).toBe(200);
      expect(body).toBeInstanceOf(Object);
      expect(body.allUsers[0]).toMatchObject(dummy1);
      expect(body.allUsers[1]).toMatchObject(dummy2);
      expect(body.allUsers[2]).toMatchObject(admin_user);
    }).catch((err) => {
      return err
    })
  });
  
  it('should GET a single user', async () => {
    // Given
    let admin_access_token
    await user.addNewUser({ body: dummy1 });
    fastify.signIn({body: admin_user})
    .then(async (token) => {
      admin_access_token = token
      
      // When
      const { body, statusCode } = await request(app.server)
      .get(`/api/users/${dummy1.username}`)
      .set({ Authorization: `Bearer ${admin_access_token}` })
      
      // Then
      expect(statusCode).toBe(200);
      expect(body).toBeInstanceOf(Object);
    }).catch((err) => {
      return err
    })
    });
    
    it('should DELETE a single user', async () => {
      // Given
      const newUser = await user.addNewUser({ body: dummy2 });
      fastify.signIn({body: admin_user}).then(async (token) => {
        admin_access_token = token
        
        // When
        const { body, statusCode } = await request(app.server)
        .delete(`/api/users/${newUser._id}`)
        .set({ Authorization: `Bearer ${admin_access_token}` });
        
        // Then
        expect(statusCode).toBe(200);
        expect(body.message).toMatch(`${newUser._id} has been deleted`);
      }).catch((err) => {
        return err
      })
    
  });
  
  it('should UPDATE a single user', async () => {
    // Given
    let admin_access_token;
    const newUser = await user.addNewUser({ body: dummy2 });
    const newDisplayName = 'Ronald';
    fastify.signIn({body: admin_user}).then(async (token) => {
      // When
      admin_access_token = token
      const { body, statusCode } = await request(app.server)
        .patch(`/api/users/${newUser._id}`)
        .send({ displayName: newDisplayName })
        .set({ Authorization: `Bearer ${admin_access_token}` });
  
      // Then
      expect(statusCode).toBe(200);
      expect(body.updatedUser.displayName).toMatch(newDisplayName);
    }).catch((err) => {
      return err
    })
  });
});
