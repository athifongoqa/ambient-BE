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

describe('Admin endpoint integration test', () => {
  const dummyMemberTwo = {
    username: 'dummyTwo',
    displayName: 'Dumb Dumb',
    email: 'dummyMember1234.dummy@code.berlin',
    avatar: 'img.ip/464559.jpg',
    role: 'member',
  };
  
  it('should GET all admin users', async () => {
    await addNewUser({body: dummyMemberTwo})

    const { body, statusCode } = await request(app.server)
    .get('/api/admin/')
    .set({ Authorization: `Bearer ${adminAccessToken}` })
    
    expect(statusCode).toBe(200);
    expect(body).toBeInstanceOf(Object);
  });

  it(`should UPDATE a single user's role from member to admin`, async () => {
    const newUser = await addNewUser({ body: dummyMemberTwo });

    const { body, statusCode } = await request(app.server)
      .patch(`/api/admin/${newUser.username}`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(statusCode).toBe(200);
    expect(body).toBeInstanceOf(Object);
    expect(body.message).toMatch(`${newUser.username} has been updated to admin.`);
  });
});
