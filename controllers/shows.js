const Show = require('../models/show.model');

const getShows = async (req, reply) => {
  const shows = await Show.find();
  shows.length !== 0
    ? reply.send(shows)
    : reply.code(404).send({ message: 'There are no shows' });
};

const getShow = async function (req, reply) {
  const { id } = req.params;

  const show = await Show.findById(id);
  show ? reply.send(show) : reply.code(404).send({ message: 'Show not found' });
};

const createShow = async (req, reply) => {
  const show = new Show(req.body);
  const returnedShow = await show.save();

  returnedShow
    ? reply.code(201).send(returnedShow)
    : reply
        .code(400)
        .send({ message: 'It was not possible to create the show' });
};

const updateShow = async (req, reply) => {
  const { id } = req.params;

  const updatedShow = await Show.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  updatedShow
    ? reply.send(updatedShow)
    : reply.code(404).send({ message: 'Show not found' });
};

const deleteShow = async (req, reply) => {
  const { id } = req.params;

  const deletedShow = await Show.findOneAndDelete({ _id: { $eq: id } });

  deletedShow
    ? reply.send({ message: `Show id ${deletedShow._id} deleted` })
    : reply.code(404).send({ message: 'Show not found' });
};

module.exports = {
  getShow,
  getShows,
  createShow,
  deleteShow,
  updateShow,
};
