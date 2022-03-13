const mongoose = require("mongoose");

const ShowSchema = new mongoose.Schema({
  creator_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    default: "Show Name",
  },
  description: {
    type: String,
    required: true,
    default: "No description",
  },
  type: {
    type: String,
    default: "",
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
  date_scheduled: {
    type: Date,
    default: Date.now,
  },
  date_ended: {
    type: Date,
    default: undefined,
  },
  participants_id: [{ type: String }],
});

module.exports = mongoose.models.Show || mongoose.model("Show", ShowSchema);
