const User = require("../models/user");
const boom = require('boom')
const validator = require("validator");

async function addNewUser(req, reply) {
    try {
        if (!validator.isEmail(req.body.email)) {
            reply.send({ message: "Please use a valid email address." });
            return;
          }
      
          let user = new User(req.body);
          let returnedUser = await user.save();
          reply.code(201).send({ addedUser: returnedUser });
    }
    catch(err) {
       throw boom.boomify(err)
    }
 }
 
module.exports = {addNewUser}