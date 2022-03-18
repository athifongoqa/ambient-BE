const build = require("./helper").build;
const request = require("supertest");

describe("root tests", () => {
  let app;

  beforeAll(async () => {
    app = await build();
  });

  afterAll(async () => {
    await app.close();
  });

  test("default root route", async () => {
    const response = await request(app.server).get("/");
    expect(response.statusCode).toBe(200);
  });
});
