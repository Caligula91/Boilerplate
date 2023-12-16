const mongoose = require('mongoose');
const { before, after } = require('mocha');

before(() => {
  process.on('SIGINT', () => {
    try {
      mongoose.connection.db.dropDatabase()
        .then(() => console.log('MongoDB collections dropped'))
        .catch((err) => console.log(err))
        .finally(() => {
          mongoose.connection.close()
            .then(() => console.log('Mongoose default connection disconnected through app termination'))
            .catch((err) => console.log(err))
            .finally(() => process.exit(0));
        });
    } catch (err) {
      console.log(err);
      process.exit(0);
    }
  });
});

after(async () => {
  try {
    await mongoose.connection.db.dropDatabase();
    console.log('MongoDB collections dropped');
  } catch (err) {
    console.log(err);
  } finally {
    await mongoose.disconnect();
  }
});
