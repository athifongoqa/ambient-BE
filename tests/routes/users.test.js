const request = require('supertest');
const { build, getAccessToken } = require('../helper');
const db = require('../testdb');
const { addNewUser } = require('../../controllers/users');

let app;
let adminAccessToken;

adminUser = {
  username:'master',
  displayName: 'master',
  email: 'master.dummy@code.berlin',
  avatar: 'img.ip/464558.jpg',
  role: 'admin'
};

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

describe('User endpoint integration tests', () => {
  const dummyMemberOne = {
    username: 'dummyOne',
    displayName: 'Dumb',
    email: 'dummyMember123.dummy@code.berlin',
    avatar: 'img.ip/464558.jpg',
    role: 'member',
  };

  const dummyMemberTwo = {
    username: 'dummyTwo',
    displayName: 'Dumb Dumb',
    email: 'dummyMember1234.dummy@code.berlin',
    avatar: 'img.ip/464559.jpg',
    role: 'member',
  };

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
    expect(body).toBeInstanceOf(Object);
    expect(body).toEqual(dummyMemberOnePayload);
  });
  
  it('should GET all users', async () => {
    await addNewUser({body: dummyMemberOne})
    await addNewUser({body: dummyMemberTwo})

    const { body, statusCode } = await request(app.server)
    .get('/api/users/')
    .set({ Authorization: `Bearer ${adminAccessToken}` })
    
    expect(statusCode).toBe(200);
    expect(body).toBeInstanceOf(Object);
    expect(body.allUsers[0]).toMatchObject(dummyMemberOne);
    expect(body.allUsers[1]).toMatchObject(dummyMemberTwo);
  });
  
  it('should GET a single user', async () => {
    await addNewUser({ body: dummyMemberOne });
    
    const { body, statusCode } = await request(app.server)
    .get(`/api/users/${dummyMemberOne.username}`)
    .set({ Authorization: `Bearer ${adminAccessToken}` })
    
    expect(statusCode).toBe(200);
    expect(body).toBeInstanceOf(Object);
    expect(body).toMatchObject(dummyMemberOnePayload);
    });

  it('should GET and return an empty users object', async () => {    
    const { body, statusCode } = await request(app.server)
    .get(`/api/users/`)
    .set({ Authorization: `Bearer ${adminAccessToken}` })
    
    expect(statusCode).toBe(200);
    expect(body).toBeInstanceOf(Object);
    });

    it('should restrict unauthenticated request to GET all users', async () => {
      await addNewUser({body: dummyMemberOne})
      await addNewUser({body: dummyMemberTwo})
  
      const { body, statusCode } = await request(app.server)
      .get('/api/users/')
      
      expect(statusCode).toBe(200);
      expect(body).toBeInstanceOf(Object);
      expect(body).toMatchObject({});
    });
    
    it('should DELETE a single user', async () => {
      const newUser = await addNewUser({ body: dummyMemberTwo });

      const { body, statusCode } = await request(app.server)
      .delete(`/api/users/${newUser._id}`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });
      
      expect(statusCode).toBe(200);
      expect(body.message).toMatch(`${newUser._id} has been deleted`);
    
  });
  
  it('should UPDATE a single user', async () => {
    const newUser = await addNewUser({ body: dummyMemberTwo });
    const newDisplayName = 'Ronald';

    const { body, statusCode } = await request(app.server)
      .patch(`/api/users/${newUser._id}`)
      .send({ displayName: newDisplayName })
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(statusCode).toBe(200);
    expect(body.updatedUser.displayName).toMatch(newDisplayName);
  });
});
