const build = require("./helper").build;
const request = require("supertest");

describe("shows integration tests", () => {
  let app;

  beforeAll(async () => {
    app = await build();
  }, 15000);

  afterAll(async () => {
    await app.close();
  });

  test("default shows route", async () => {
    const { statusCode, body } = await request(app.server).get("/api/shows/");
    expect(statusCode).toBe(200);
    expect(body).toBeInstanceOf(Array);
    expect(body[0]).toHaveProperty("description");
    expect(body).not.toHaveLength(0);
  });
});
