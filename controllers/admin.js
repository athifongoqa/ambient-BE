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

async function updateMemberToAdmin(req, reply) {
    try {
        const { username } = req.params;
        const newAdmin = await User.updateOne({username: username}, {role: 'admin'});
        reply.send({message: `${username} has been updated to admin.`});
    } catch (err) {
        throw boom.boomify(err);
    }
}

module.exports = {
    getAllAdmins, updateMemberToAdmin
}
