const mockingoose = require("mockingoose");
const UserModel = require("../../models/user.js");
const request = require("supertest");
const build = require("./helper").build;

const userPayLoad = {
    _id: expect.any(String),
    username: 'athif',
    displayName: 'Athi F',
    email: 'dummy.dummy@code.berlin',
    avatar: 'img.ip/464558.jpg',
    followers: [],
    following: [],
}

// Given
const userInput = {
    username: 'athif',
    displayName: 'Athi F',
    email: 'dummy.dummy@code.berlin',
    avatar: 'img.ip/464558.jpg',
  };


describe("User routes", () => {

    let app;

    beforeAll(async () => {
        app = await build();
      }, 15000);
    
      afterAll(async () => {
        await app.close();
      });

    it("Post a single user", async () => {
      // When       
      const { statusCode, body } = await request(app.server).post('/api/users/').send(userInput)

      // Then
      expect(statusCode).toBe(201)
      expect(body).toBeInstanceOf(Object);
      expect(body.addedUser).toMatchObject(userPayLoad)
    
    });

  });
  