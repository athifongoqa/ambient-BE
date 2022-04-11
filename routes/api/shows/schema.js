const {
  getShow,
  getShows,
  createShow,
  deleteShow,
  updateShow,
} = require('../../../controllers/shows');

const returnedShow = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    creator_id: { type: 'string', format: 'uuid' },
    name: { type: 'string' },
    description: { type: 'string' },
    type: { type: 'string' },
    date_created: { type: 'string', format: 'date-time' },
    date_scheduled: { type: 'string', format: 'date-time' },
    date_ended: { type: 'string', format: 'date-time' },
    participants_id: {
      type: 'array',
      items: { type: 'string', format: 'uuid' },
    },
  },
};

const show = {
  type: 'object',
  properties: {
    creator_id: { type: 'string', format: 'uuid' },
    name: { type: 'string', example: 'New Show Name' },
    description: { type: 'string', example: 'New Show Description' },
    date_created: { type: 'string', format: 'date-time' },
    date_scheduled: { type: 'string', format: 'date-time' },
  },
};

const getShowsOpts = {
  schema: {
    tags: ['show'],
    response: {
      200: {
        description: 'Get all shows',
        type: 'array',
        items: returnedShow,
      },
      404: {
        description: 'No shows found',
        type: 'object',
        properties: {
          message: { type: 'string', example: 'There are no shows' },
        },
      },
    },
  },
  handler: getShows,
};

const getShowOpts = {
  schema: {
    params: {
      id: {
        type: 'string',
        description: 'Id of show to get',
      },
    },
    tags: ['show'],
    response: {
      200: {
        ...returnedShow,
        description: 'Get a single show',
      },
      404: {
        description: 'No show found',
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Show not found' },
        },
      },
    },
  },
  handler: getShow,
};

const postShowOpts = {
  schema: {
    tags: ['show'],
    body: {
      required: [
        'creator_id',
        'name',
        'description',
        'date_created',
        'date_scheduled',
      ],
      ...show,
    },
    response: {
      201: {
        ...returnedShow,
        description: 'Create a new show',
      },
    },
  },
  handler: createShow,
};

const deleteShowOpts = {
  schema: {
    params: {
      id: {
        type: 'string',
        description: 'Id of show to delete',
      },
    },
    tags: ['show'],
    response: {
      200: {
        description: 'Delete show',
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Show deleted' },
        },
      },
      404: {
        description: 'No show found',
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Show not found' },
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
        type: 'string',
        description: 'Id of show to update',
      },
    },
    body: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Update Show Name' },
        type: { type: 'string', example: 'Live Show' },
      },
    },
    tags: ['show'],
    response: {
      200: {
        ...returnedShow,
        description: 'Updated show',
      },
      404: {
        description: 'No show found',
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Show not found' },
        },
      },
    },
  },
  handler: updateShow,
};

module.exports = {
  getShowsOpts,
  getShowOpts,
  postShowOpts,
  deleteShowOpts,
  updateShowOpts,
};
