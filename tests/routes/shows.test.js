const mockingoose = require("mockingoose");
const ShowModel = require("../../models/show.model.js");
const {
  getShow,
  getShows,
  createShow,
  updateShow,
} = require("../../controllers/shows.js");

describe("Shows routes", () => {
  it("Get single show", async () => {
    // Arrange
    const showInput = {
      _id: "1234",
      name: "Test Show Name",
    };

    const req = {
      params: {
        id: showInput._id,
      },
    };

    const reply = {
      send: jest.fn().mockImplementation((res) => {
        response = res;
      }),
    };

    mockingoose(ShowModel).toReturn(showInput, "findOne");

    let response;

    // Act
    await getShow(req, reply);

    // Assert
    expect(response).toHaveProperty("name", "Test Show Name");
    expect(response).toBeInstanceOf(Object);
    expect(reply.send).toBeCalledTimes(1);
  });

  it("Get all shows", async () => {
    // Arrange
    const showsInput = [
      {
        _id: "1234",
        name: "Test Show Name",
      },
      {
        _id: "5678",
        name: "Test Show Name 2",
      },
    ];

    const req = {};

    const reply = {
      send: jest.fn().mockImplementation((res) => {
        response = res;
      }),
    };

    mockingoose(ShowModel).toReturn(showsInput, "find");

    let response;

    // Act
    await getShows(req, reply);

    // Assert
    expect(response).toHaveLength(2);
    expect(response[0]).toHaveProperty("name", "Test Show Name");
    expect(response[1]).toHaveProperty("name", "Test Show Name 2");
    expect(response).toBeInstanceOf(Array);
    expect(reply.send).toBeCalledTimes(1);
  });

  it("Create a show", async () => {
    // Arrange
    const showInput = {
      name: "Test Show Name",
      creator_id: "1234567890123456",
    };

    const req = {
      body: showInput,
    };

    const reply = {
      code: jest.fn().mockImplementation(function (code) {
        responseCode = code;
        return this;
      }),
      send: jest.fn().mockImplementation((res) => {
        response = res;
      }),
    };

    mockingoose(ShowModel).toReturn(showInput, "save");

    let responseCode;
    let response;

    // Act
    await createShow(req, reply);

    // Assert
    expect(responseCode).toBe(201);
    expect(response).toHaveProperty("name", "Test Show Name");
    expect(response).toBeInstanceOf(Object);
    expect(reply.send).toBeCalledTimes(1);
  });

  it("Update a show", async () => {
    // Arrange
    const showInput = {
      _id: "1234",
      name: "Test Show Name",
      creator_id: "1234567890123456",
    };

    const req = {
      params: {
        id: showInput._id,
      },
      body: { name: "Test Show Name Updated" },
    };

    const reply = {
      send: jest.fn().mockImplementation((res) => {
        response = {
          name: req.body.name,
          ...res,
        };
      }),
    };

    mockingoose(ShowModel).toReturn(showInput, "findOneAndUpdate");

    let response;

    // Act
    await updateShow(req, reply);

    // Assert
    expect(response).toHaveProperty("name", "Test Show Name Updated");
    expect(response).toBeInstanceOf(Object);
    expect(reply.send).toBeCalledTimes(1);
  });
});
