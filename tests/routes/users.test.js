const request = require('supertest');
const { build, getAccessToken } = require('../helper');
const db = require('../testdb');
const users = require('../../controllers/users');
const user = require('../../controllers/users')

let app;
let adminAccessToken;

function createDummyUser(username, displayName, email, avatar, role) {
  return {
    username: username,
    displayName: displayName,
    email: email,
    avatar: avatar,
    role: role
  };
}

adminUser = createDummyUser(
  'master',
  'master',
  'master.dummy@code.berlin',
  'img.ip/464558.jpg',
  'admin'
);

beforeAll(async () => {
  app = await build();
  await db.connect();
  adminAccessToken = await getAccessToken(adminUser);
}, 15000);

beforeEach(async () => {
  await db.clearDatabase();
});

afterAll(async () => {
  app.close()
  await db.closeDatabase();
}, 30000);

describe('E2E User endpoints', () => {
  const dummyMemberOne = createDummyUser(
    'dummyOne',
    'Dumb',
    'dummyMember123.dummy@code.berlin',
    'img.ip/464558.jpg',
    'member',
  );

  const dummyMemberTwo = createDummyUser(
    'dummyTwo',
    'Dumb Dumb',
    'dummyMember1234.dummy@code.berlin',
    'img.ip/464559.jpg',
    'member',
  );

  const dummyMemberOnePayload = {
    _id: expect.any(String),
    username: 'dummyOne',
    displayName: 'Dumb',
    email: 'dummyMember123.dummy@code.berlin',
    avatar: 'img.ip/464558.jpg',
    role: 'member',
    followers: [],
    following: [],
  };
  
  it('should POST a single user', async () => {    
    const { statusCode, body } = await request(app.server)
    .post('/api/users/')
    .send(dummyMemberOne)
    .set({ Authorization: `Bearer ${adminAccessToken}` });
    
    expect(statusCode).toBe(200);
    console.log(body)
    expect(body).toBeInstanceOf(Object);
    expect(body).toEqual(dummyMemberOnePayload);
  });
  
  it('should GET all users', async () => {
    await users.addNewUser({body: dummyMemberOne})
    await users.addNewUser({body: dummyMemberTwo})

    const { body, statusCode } = await request(app.server)
    .get('/api/users/')
    .set({ Authorization: `Bearer ${adminAccessToken}` })
    
    expect(statusCode).toBe(200);
    expect(body).toBeInstanceOf(Object);
    expect(body.allUsers[0]).toMatchObject(dummyMemberOne);
    expect(body.allUsers[1]).toMatchObject(dummyMemberTwo);
  });
  
  it('should GET a single user', async () => {
    await user.addNewUser({ body: dummyMemberOne });
    
    const { body, statusCode } = await request(app.server)
    .get(`/api/users/${dummyMemberOne.username}`)
    .set({ Authorization: `Bearer ${adminAccessToken}` })
    
    expect(statusCode).toBe(200);
    expect(body).toBeInstanceOf(Object);
    });
    
    it('should DELETE a single user', async () => {
      const newUser = await user.addNewUser({ body: dummyMemberTwo });

      const { body, statusCode } = await request(app.server)
      .delete(`/api/users/${newUser._id}`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });
      
      expect(statusCode).toBe(200);
      expect(body.message).toMatch(`${newUser._id} has been deleted`);
    
  });
  
  it('should UPDATE a single user', async () => {
    const newUser = await user.addNewUser({ body: dummyMemberTwo });
    const newDisplayName = 'Ronald';

    const { body, statusCode } = await request(app.server)
      .patch(`/api/users/${newUser._id}`)
      .send({ displayName: newDisplayName })
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(statusCode).toBe(200);
    expect(body.updatedUser.displayName).toMatch(newDisplayName);
  });
});
