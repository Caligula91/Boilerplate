const mongoose = require('mongoose');

before((done) => {
  mongoose.connection.on('open', () => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
});

after((done) => {
  mongoose.connection.db.dropDatabase(() => {
    console.log('MongoDB collections dropped');
    mongoose.disconnect();
    done();
  });
});
