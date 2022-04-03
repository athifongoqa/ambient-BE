const userController = require('../../../controllers/users');
const {
  getUsersOpts, getUserOpts, postUserOpts, deleteUserOpts, updateUserOpts,
} = require('./schema');

module.exports = async function (fastify, opts) {
  fastify.register(require('fastify-prettier'), {
    alwaysOn: true,
  });

  fastify.get('/', getUsersOpts.schema, userController.getAllUsers);

  fastify.get('/:username', getUserOpts.schema, userController.getSingleUser);

  fastify.post('/', postUserOpts.schema, userController.addNewUser);

  fastify.patch('/:id', updateUserOpts.schema, userController.updateSingleUser);

  fastify.delete('/:id', deleteUserOpts.schema, userController.deleteSingleUser);
};
