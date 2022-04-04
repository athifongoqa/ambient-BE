const userController = require('../../../controllers/users')

const User = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    username: { type: 'string' },
    displayName: { type: 'string' },
    email: { type: 'string' },
    avatar: { type: 'string' },
    following: { type: 'array', items: { type: 'object', format: 'uuid'} },
    followers: { type: 'array', items: { type: 'object', format: 'uuid'} },
  },
};

const getUsersOpts = {
  schema: {
    tags: ['user'],
    response: {
      200: {
        description: 'Get all users',
        type: 'array',
        items: User,
      },
    },
  },
  handler: userController.getAllUsers,
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
        ...User,
        description: 'Get a single user',
      },
    },
  },
  handler: userController.getSingleUser,
};

const postUserOpts = {
  schema: {
    tags: ['user'],
    body: {
      required: [
        'username',
        'displayName',
        'email',
        'avatar',
      ],
      ...User,
    },
    response: {
      200: {
        ...User,
        description: 'Created a new user',
      },
    },
  },
  handler: userController.addNewUser
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
        description: 'Deleted user',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: userController.deleteSingleUser
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
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: userController.updateSingleUser
};

module.exports = {
  getUsersOpts, getUserOpts, postUserOpts, deleteUserOpts, updateUserOpts,
};
