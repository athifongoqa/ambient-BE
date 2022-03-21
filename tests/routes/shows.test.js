const mockingoose = require("mockingoose");
const ShowModel = require("../../models/show.model.js");
const {
  getShow,
  getShows,
  createShow,
  deleteShow,
  updateShow,
} = require("../../controllers/shows");

describe("Shows routes", () => {
  describe("Get single Show", () => {
    it("should return the one show", async () => {
      mockingoose(ShowModel).toReturn(
        {
          _id: "123456789012345678901234",
          creator_id: "987654321098765432109876",
          name: "Mock Name Show",
          description: "Mocking description",
          type: "Mocked Type",
          date_created: "2020-01-01T20:00:00.000Z",
          date_scheduled: "2020-01-01T20:00:00.000Z",
          date_ended: "2020-01-01T20:00:00.000Z",
          participants_id: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
        },
        "findOne"
      );
      const results = await getShow();
      expect(results.title).toBe("Mock Name Show");
    });
  });
});
