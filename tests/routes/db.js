const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

// const mongoOpts = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

const connect = async () => {
  await mongoose.disconnect();
  mongoServer = await MongoMemoryServer.create();

  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

const closeConnection = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

const clearConnection = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany();
  }
};

module.exports = { connect, closeConnection, clearConnection };
