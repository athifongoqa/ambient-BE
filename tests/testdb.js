const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const boom = require('boom');

let mongod;

module.exports.connect = async () => {
  try {
    await mongoose.disconnect();
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    const mongooseOpts = {
      useNewUrlParser: true,
    };

    await mongoose.connect(uri, mongooseOpts);
  } catch (err) {
    throw boom.boomify(err);
  }
};

module.exports.closeDatabase = async () => {
  try {
    if (mongod) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      await mongod.stop();
    } 
  } catch (err) {
    throw boom.boomify(err);
  }
};

module.exports.clearDatabase = async () => {
  try {
    if (mongod) {
      const { collections } = mongoose.connection;
  
      for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
      }
    }
  } catch (err) {
    throw boom.boomify(err);
  }
};
