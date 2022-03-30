const mockingoose = require("mockingoose");
const ShowModel = require("../../models/show.model.js");
const {
  getShow,
  getShows,
  createShow,
  updateShow,
  deleteShow,
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

  it("Delete a show", async () => {
    // Arrange
    const showInput = {
      _id: "622d46cd755a74341a120491",
      creator_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      name: "No name show 10",
      description: "No description yet",
      type: "live",
      date_created: "2020-01-01T20:00:00.000+00:00",
      date_scheduled: "2020-01-01T20:00:00.000+00:00",
      date_ended: "2020-01-01T20:00:00.000+00:00",
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

    mockingoose(ShowModel).toReturn(showInput, "findOneAndRemove");

    let response;

    // Act
    await deleteShow(req, reply);

    // Assert
    expect(response).toHaveProperty(
      "message",
      `${req.params.id} has been deleted`
    );
    expect(response).toBeInstanceOf(Object);
    expect(reply.send).toBeCalledTimes(1);
  });
});
