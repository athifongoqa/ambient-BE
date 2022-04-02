const User = require("../models/user");
const boom = require('boom')
const validator = require("validator");

async function addNewUser(req, reply) {
    try {
        if (!validator.isEmail(req.body.email)) {
            return { message: "Please use a valid email address." };
          }
      
        let user = new User(req.body);
        let returnedUser = await user.save();
        return returnedUser
    }
    catch(err) {
       throw boom.boomify(err)
    }
 }

async function getSingleUser(req, reply) {
    try {
    const username = req.params.username;
    let user = await User.findOne({ username: username });
    return user;
    }
    catch(err) {
       throw boom.boomify(err)
    }
 }
 
module.exports = {addNewUser, getSingleUser}