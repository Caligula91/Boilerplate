/* eslint-disable global-require */
/* eslint-disable no-console */
const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const { expressjwt } = require('express-jwt');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const lusca = require('lusca');
const ErrorHandler = require('./middlewares/errorHandling/errorHandler');
const mongoDB = require('./config/database/mongodb/connection');
const environments = require('./config/environments');
const { name } = require('./package.json');

const port = environments.PORT;
const appURL = `http://localhost:${port}/api/v1/`;

const app = express();

// Application Routes
const UserRoutes = require('./components/user/userRouter');

app.use(cors());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(mongoSanitize());

app.disable('x-powered-by');

// Security
app.use(lusca.xframe('ALLOWALL'));
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

// Whitelisted routes
app.use(expressjwt({ secret: environments.JWT_SECRET, algorithms: ['HS256'] }).unless({
  path: [
    '/api/v1/user/signin',
    '/api/v1/user/refresh-token',
    '/api/v1/user/forgot-password',
    /\/apidoc\/?/,
  ],
}));

app.use('/api/v1', UserRoutes);

// Create the database connection
mongoose.connect(mongoDB.connectionString());

mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection open to ${mongoDB.connectionString()}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

mongoose.connection.on('open', () => {
  console.log('Mongoose default connection is open');
});

process.on('SIGINT', () => {
  mongoose.connection.close()
    .then(() => console.log('Mongoose default connection disconnected through app termination'))
    .catch((err) => console.log(err))
    .finally(() => process.exit(0));
});

if (environments.NODE_ENV === 'development') {
  // eslint-disable-next-line import/no-extraneous-dependencies
  const { createDoc } = require('apidoc');

  const apiDocsLocation = path.resolve(__dirname, 'doc');
  const doc = createDoc({
    src: [path.resolve(__dirname, 'components')],
    dest: apiDocsLocation,
    dryRun: false,
    silent: false,
  });

  app.use('/api/v1/apidoc', express.static(path.join(__dirname, '/doc')));

  if (typeof doc !== 'boolean') {
    console.log(`Apidoc generated at ${apiDocsLocation}`);
  }
}

app.use(ErrorHandler());

// show env vars
console.log(`__________ ${name} __________`);
console.log('Time server started:', new Date());
console.log(`Starting on port: ${port}`);
console.log(`Env: ${environments.NODE_ENV}`);
console.log(`App url: ${appURL}`);
console.log('______________________________');

app.listen(port);
module.exports = app;
