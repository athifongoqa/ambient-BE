const build = require("./helper").build;
const request = require("supertest");

describe("shows integration tests", () => {
  let app;

  beforeAll(async () => {
    app = await build();
  });

  afterAll(async () => {
    await app.close();
  });

  test("default shows route", async () => {
    const response = await request(app.server).get("/api/shows/");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("description");
    expect(response.body).not.toHaveLength(0);
  });
});
