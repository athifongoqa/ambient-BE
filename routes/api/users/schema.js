const getUsersOpts = {
  schema: {
    tags: ['user'],
    response: {
      200: {
        type: 'object',
        description: 'Get all users',
      },
    },
  },
};

const getUserOpts = {
  schema: {
    params: {
      id: {
        type: 'string',
        description: 'Numeric value of user to get',
      },
    },
    tags: ['user'],
    response: {
      200: {
        type: 'object',
        description: 'Get a single user',
      },
    },
  },
};

const postUserOpts = {
  schema: {
    tags: ['user'],
    body: {
      required: [
        'username',
        'email',
      ],
    },
    response: {
      200: {
        type: 'object',
        description: 'Create a new user',
      },
    },
  },
};

const deleteUserOpts = {
  schema: {
    params: {
      id: {
        type: 'string',
        description: 'Numeric value of user to delete',
      },
    },
    tags: ['user'],
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
};

const updateUserOpts = {
  schema: {
    params: {
      id: {
        type: 'string',
        description: 'Numeric value of user to update',
      },
    },
    tags: ['user'],
    response: {
      200: {
        type: 'object',
        description: 'Updated user',
      },
    },
  },
};

module.exports = {
  getUsersOpts, getUserOpts, postUserOpts, deleteUserOpts, updateUserOpts,
};
