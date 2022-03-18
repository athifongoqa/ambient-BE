const build = require("./helper").build;
const request = require("supertest");

const baseUrl = "/api/shows";

describe("shows tests", () => {
  let app;

  beforeAll(async () => {
    app = await build();
  });

  afterAll(async () => {
    await app.close();
  });

  test("get all shows", async () => {
    const response = await request(app.server).get(`${baseUrl}/`);
    expect(response.statusCode).toBe(200);
  });

  // test("get single show", async () => {
  //   const response = await request(app.server).get(`${baseUrl}/`);
  //   expect(response.statusCode).toBe(200);
  // });
});
