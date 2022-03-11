"use strict";

const shows = [
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

const Show = {
  type: "object",
  properties: {
    _id: { type: "string", format: "uuid" },
    creator_id: { type: "string", format: "uuid" },
    name: { type: "string" },
    description: { type: "string" },
    type: { type: "string" },
    date_created: { type: "string", format: "date-time" },
    date_scheduled: { type: "string", format: "date-time" },
    date_ended: { type: "string", format: "date-time" },
    participants_id: {
      type: "array",
      items: { type: "string", format: "uuid" },
    },
  },
};

const getShowsOpts = {
  schema: {
    tags: ["show"],
    response: {
      200: {
        description: "Get all shows",
        type: "array",
        items: Show,
      },
    },
  },
  handler: async function (req, reply) {
    reply.send(shows);
  },
};

const getShowOpts = {
  schema: {
    tags: ["show"],
    response: {
      200: {
        ...Show,
        description: "Get a single show",
      },
    },
  },
  handler: async function (req, reply) {
    const { id } = req.params;
    const show = shows.find((show) => show._id === id);
    reply.send(show);
  },
};

module.exports = async function (fastify, opts) {
  fastify.get("/", getShowsOpts);

  fastify.get("/:id", getShowOpts);

  // fastify.post("/", postShowOpts, async function (req, reply) {
  //   reply.send(show);
  // });
};
