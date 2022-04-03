const Show = require('../models/show.model');

const getShows = async (req, reply) => {
  const shows = await Show.find();
  reply.send(shows);
};

const getShow = async function (req, reply) {
  const { id } = req.params;
  const show = await Show.findById(id);

  try {
    show
      ? reply.send(show)
      : reply.status(404).send({ message: 'Show not found' });
  } catch (error) {
    reply.status(500).send({ message: error.message });
  }
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

  const deletedShow = await Show.findOneAndRemove(id);
  reply.send({ message: `${deletedShow._id} has been deleted` });
};

module.exports = {
  getShow,
  getShows,
  createShow,
  deleteShow,
  updateShow,
};
