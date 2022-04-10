const {
  addNewUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
} = require('../../../controllers/users');

const returnedUser = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    username: { type: 'string' },
    displayName: { type: 'string' },
    email: { type: 'string' },
    avatar: { type: 'string' },
    following: {
      type: 'array',
      items: { type: 'string', format: 'uuid' },
    },
    followers: {
      type: 'array',
      items: { type: 'string', format: 'uuid' },
    },
  },
};

const user = {
  type: 'object',
  properties: {
    username: { type: 'string', example: 'newUser' },
    displayName: { type: 'string', example: 'New Display Name' },
    email: { type: 'string', format: 'email', example: 'user@ambient.com' },
    avatar: {
      type: 'string',
      example: 'https://avatars3.githubusercontent.com/u/1234567',
    },
  },
};

const getUsersOpts = {
  schema: {
    tags: ['user'],
    response: {
      200: {
        type: 'object',
        description: 'Get all users',
        properties: {
          allUsers: {
            type: 'array',
            items: returnedUser,
          },
        },
      },
    },
  },
  handler: getAllUsers,
};

const getUserOpts = {
  schema: {
    params: {
      username: {
        type: 'string',
        description: 'Username of user to get',
      },
    },
    tags: ['user'],
    response: {
      200: {
        ...returnedUser,
        description: 'Get a single user',
      },
    },
  },
  handler: getSingleUser,
};

const postUserOpts = {
  schema: {
    tags: ['user'],
    body: {
      required: ['username', 'email'],
      ...user,
    },
    response: {
      200: {
        ...returnedUser,
        description: 'Create a new user',
      },
    },
  },
  handler: addNewUser,
};

const deleteUserOpts = {
  schema: {
    params: {
      id: {
        type: 'string',
        description: 'Id of user to delete',
      },
    },
    tags: ['user'],
    response: {
      200: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '1234567890abcdef12345678 has been deleted',
          },
        },
      },
    },
  },
  handler: deleteSingleUser,
};

const updateUserOpts = {
  schema: {
    params: {
      id: {
        type: 'string',
        description: 'Id of user to update',
      },
    },
    body: {
      type: 'object',
      properties: {
        displayName: { type: 'string', example: 'Updated Name' },
      },
    },
    tags: ['user'],
    response: {
      200: {
        type: 'object',
        properties: {
          updatedUser: {
            ...returnedUser,
          },
        },
        description: 'Updated user',
      },
    },
  },
  handler: updateSingleUser,
};

module.exports = {
  getUsersOpts,
  getUserOpts,
  postUserOpts,
  deleteUserOpts,
  updateUserOpts,
};
