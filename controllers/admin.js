const User = require('../models/user.model');
const boom = require('boom');

async function getAllAdmins(req, reply) {
    try {
      const adminUsers = await User.find({ role: 'admin' });
      reply.send({ allAdminUsers: adminUsers });
    } catch (err) {
      throw boom.boomify(err);
    }
  }

module.exports = {
    getAllAdmins
}
