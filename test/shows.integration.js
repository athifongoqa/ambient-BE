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

  it("Get all shows", async () => {
    const { statusCode, body } = await request(app.server).get("/api/shows/");

    assert.equal(statusCode, 200);
    assert.equal(Array.isArray(body), true);
    assert.notEqual(body.length, 0);
    assert.notEqual(body[0].description, undefined);
  });

  it("Get a single show", async () => {
    const { statusCode, body } = await request(app.server).get(
      "/api/shows/622d46cd755a74341a120491"
    );

    assert.equal(statusCode, 200);
    assert.equal(body.name, "No name show 10");
    assert.equal(typeof body, "object");
  });
});
