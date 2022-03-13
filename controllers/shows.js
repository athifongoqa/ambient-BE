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
