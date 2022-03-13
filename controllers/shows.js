let dummyShows = [
  {
    _id: "1",
    creator_id: "2",
    name: "Show 1",
    description: "This is the first show",
    type: "public",
    date_created: "2020-01-01T20:00:00.000Z",
    date_scheduled: "2020-01-01T21:00:00.000Z",
    date_ended: "2020-01-01T21:01:00.000Z",
    participants_id: ["1", "2", "3"],
  },
  {
    _id: "2",
    creator_id: "2",
    name: "Show 2",
    description: "This is the second show",
    type: "public",
    date_created: "2020-01-01T20:00:00.000Z",
    date_scheduled: "2020-01-01T21:00:00.000Z",
    date_ended: "2020-01-01T21:01:00.000Z",
    participants_id: ["2", "3"],
  },
  {
    _id: "3",
    creator_id: "1",
    name: "Show 3",
    description: "This is the third show",
    type: "public",
    date_created: "2020-01-01T20:00:00.000Z",
    date_scheduled: "2020-01-01T21:00:00.000Z",
    date_ended: "2020-01-01T21:01:00.000Z",
    participants_id: ["1", "3"],
  },
];

const Show = require("../models/show.model");

const getShows = async (req, reply) => {
  const shows = await Show.find();
  reply.send(shows);
};

const getShow = async function (req, reply) {
  const { id } = req.params;
  let show = await Show.findOne({ _id: id });
  reply.send(show);
};

const createShow = async (req, reply) => {
  const show = new Show(req.body);
  const returnedShow = await show.save();
  reply.code(201).send(returnedShow);
};

const updateShow = async (req, reply) => {
  const { id } = req.params;
  const updatedShow = await Show.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  reply.send(updatedShow);
};

const deleteShow = async (req, reply) => {
  const { id } = req.params;

  const deletedShow = await Show.findByIdAndDelete(id);
  reply.send({ message: `${deletedShow.id} has been deleted` });
};

module.exports = {
  getShow,
  getShows,
  createShow,
  deleteShow,
  updateShow,
};
