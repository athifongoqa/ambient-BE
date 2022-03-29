const mockingoose = require("mockingoose");
const ShowModel = require("../../models/show.model.js");
const { getShow, getShows } = require("../../controllers/shows.js");

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
});
