const mockingoose = require("mockingoose");
const ShowModel = require("../../models/show.model.js");
const { getShow } = require("../../controllers/shows.js");

describe("Shows routes", () => {
  describe("Shows routes", () => {
    it("get single show return 1 show", async () => {
      let value = null;
      const show = {
        _id: "1234",
        name: "Test Show Name",
        description: "Test Show Description",
        type: "Test Show Type",
      };

      mockingoose(ShowModel).toReturn(show, "findOne");

      const results = await getShow(
        { params: { _id: "1234" } },
        {
          send: (show) => {
            value = show;
          },
        }
      );
      expect(value).toHaveProperty("name", "Test Show Name");
    });
  });
});
