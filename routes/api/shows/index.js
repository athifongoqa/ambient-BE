"use strict";

const {
  getShow,
  getShows,
  createShow,
  deleteShow,
  updateShow,
} = require("../../../controllers/shows");

const Show = {
  type: "object",
  properties: {
    _id: { type: "string" },
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
    params: {
      id: {
        type: "string",
        description: "Numeric value of show to get",
      },
    },
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
    body: {
      required: [
        "creator_id",
        "name",
        "description",
        "date_created",
        "date_scheduled",
      ],
      ...Show,
    },
    response: {
      201: {
        ...Show,
        description: "Create a new show",
      },
    },
  },
  handler: createShow,
};

const deleteShowOpts = {
  schema: {
    params: {
      id: {
        type: "string",
        description: "Numeric value of show to delete",
      },
    },
    tags: ["show"],
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  handler: deleteShow,
};

const updateShowOpts = {
  schema: {
    params: {
      id: {
        type: "string",
        description: "Numeric value of show to update",
      },
    },
    body: Show,
    tags: ["show"],
    response: {
      200: {
        ...Show,
        description: "Updated show",
      },
    },
  },
  handler: updateShow,
};

module.exports = async function (fastify, opts) {
  fastify.register(require("fastify-prettier"), {
    alwaysOn: true,
  });
  // Get all shows
  fastify.get("/", getShowsOpts);

  // Get single show
  fastify.get("/:id", getShowOpts);

  // Create a new show
  fastify.post("/", postShowOpts);

  // Delete a show
  fastify.delete("/:id", deleteShowOpts);

  // Update a show
  fastify.put("/:id", updateShowOpts);
};
