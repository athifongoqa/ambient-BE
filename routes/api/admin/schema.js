const returnedAdmin = {
    type: 'object',
    properties: {
      _id: { type: 'string' },
      username: { type: 'string' },
      displayName: { type: 'string' },
      email: { type: 'string' },
      avatar: { type: 'string' },
      role: { type: 'string' },
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

const getAdminsOpts = {
    tags: ['admin'],
    response: {
      200: {
        type: 'object',
        description: 'Get all admins',
        properties: {
          allUsers: {
            type: 'array',
            items: returnedAdmin,
          },
        },
      },
    },
  };

const updateMemberToAdminOpts = {
    params: {
      username: {
        type: 'string',
        description: 'Username of user to update',
      },
    },
    tags: ['admin'],
    response: {
      200: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                example: '1234567890abcdef12345678 has been updated to admin',
              },
        },
        description: 'Updated user',
      },
    },
  };

module.exports = {
    getAdminsOpts, updateMemberToAdminOpts
}