const Show = require('../models/show.model');

const getShows = async (req, reply) => {
  try {
    const shows = await Show.find();
    shows.length !== 0
      ? reply.send(shows)
      : reply.code(404).send({ message: 'There are no shows' });
  } catch (error) {
    reply.code(500).send({ message: 'The server returned an error' });
  }
};

const getShow = async function (req, reply) {
  const { id } = req.params;

  try {
    const show = await Show.findById(id);
    // eslint-disable-next-line no-unused-expressions
    show
      ? reply.send(show)
      : reply.status(404).send({ message: 'Show not found' });
  } catch (error) {
    reply.status(500).send({ message: 'The server returned an error' });
  }
};

const createShow = async (req, reply) => {
  try {
    const show = new Show(req.body);
    const returnedShow = await show.save();

    returnedShow
      ? reply.code(201).send(returnedShow)
      : reply
          .status(500)
          .send({ message: 'It was not possible to create the show' });
  } catch (error) {
    reply.status(500).send({ message: 'The server returned an error' });
  }
};

const updateShow = async (req, reply) => {
  const { id } = req.params;

  try {
    const updatedShow = await Show.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    updatedShow
      ? reply.send(updatedShow)
      : reply.status(404).send({ message: 'Show not found' });
  } catch (error) {
    reply.status(500).send({ message: 'The server returned an error' });
  }
};

const deleteShow = async (req, reply) => {
  const { id } = req.params;

  try {
    const deletedShow = await Show.findOneAndRemove(id);

    deletedShow
      ? reply.send({ message: 'Show deleted' })
      : reply.status(404).send({ message: 'Show not found' });
  } catch (error) {
    reply.status(500).send({ message: 'The server returned an error' });
  }
};

module.exports = {
  getShow,
  getShows,
  createShow,
  deleteShow,
  updateShow,
};
