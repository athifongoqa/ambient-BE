"use strict";

const { getShow, getShows, createShow } = require("../../controllers/shows");

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
  handler: getShows,
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
  handler: getShow,
};

const postShowOpts = {
  schema: {
    tags: ["show"],
    response: {
      201: {
        ...Show,
        description: "Create a new show",
      },
    },
  },
  handler: createShow,
};

module.exports = async function (fastify, opts) {
  // Get all shows
  fastify.get("/", getShowsOpts);

  // Get single show
  fastify.get("/:id", getShowOpts);

  fastify.post("/", postShowOpts);
};
