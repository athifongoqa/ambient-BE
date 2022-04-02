const request = require("supertest");
const assert = require("assert");
const { build } = require("../tests/routes/helper");

describe("shows integration tests", () => {
  let app;

  before(async () => {
    app = await build();
  });

  after(async () => {
    await app.close();
  });

  it("default shows route", async () => {
    const { statusCode, body } = await request(app.server).get("/api/shows/");

    assert.equal(statusCode, 200);
    assert.notEqual(body.length, 0);
  });
});
