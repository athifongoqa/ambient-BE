const { build } = require("./helper");
const request = require("supertest");

describe("root tests", () => {
  let app;

  beforeAll(async () => {
    app = await build();
  }, 15000);

  afterAll(async () => {
    await app.close();
  });

  test("default root route", async () => {
    const response = await request(app.server).get("/");
    expect(response.statusCode).toBe(200);
  });
});
