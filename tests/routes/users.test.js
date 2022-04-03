const request = require("supertest");
const { build } = require("./helper");
const db = require("../testdb")
const users = require("../../controllers/users")

let app

function createDummyUser(username, displayName, email, avatar){
    return {
        username: username,
        displayName: displayName,
        email: email,
        avatar: avatar,
    }
}

const userPayLoad = {
    _id: expect.any(String),
    username: 'athiF',
    displayName: 'Athi F',
    email: 'dummy123.dummy@code.berlin',
    avatar: 'img.ip/464558.jpg',
    followers: [],
    following: [],
}

beforeAll(async () => {
    app = await build();
    await db.connect()
  }, 15000);

beforeEach(async () => {
    await db.clearDatabase()
});

afterAll(async () => {
    await db.closeDatabase()
});

describe("E2E User endpoints", () => {

    it("should POST a single user", async () => {
        // Given 
        const dummy = createDummyUser('athiF', 'Athi F', 'dummy123.dummy@code.berlin', 'img.ip/464558.jpg')

        // When (Only 1 operation)
        const { statusCode, body } = await request(app.server).post('/api/users/').send(dummy)

        // Then
        expect(statusCode).toBe(200)
        expect(body).toBeInstanceOf(Object);
        expect(body).toMatchObject(userPayLoad)
    
    })

    it('should GET all users', async () => {
        // Given 
        const dummy1 = createDummyUser('athiF', 'Athi F', 'dummy123.dummy@code.berlin', 'img.ip/464558.jpg')
        const dummy2 = createDummyUser('athiFo', 'Athi Fo', 'dummy1234.dummy@code.berlin', 'img.ip/464559.jpg')
        await users.addNewUser({body: dummy1})
        await users.addNewUser({body: dummy2})

        // When
        const { body, statusCode } = await request(app.server).get('/api/users/')
        
        // Then
        expect(statusCode).toBe(200)
        expect(body).toBeInstanceOf(Object);
        expect(body.allUsers).toBeInstanceOf(Object);
        expect(body.allUsers[0]).toMatchObject(dummy1);
        expect(body.allUsers[1]).toMatchObject(dummy2);
     })
  });
  