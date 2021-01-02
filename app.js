const express = require('express');
const cleanroutes = require('express-clean-routes');

const logger = require('morgan');
const helmet = require('helmet');
const routes = require('./routes');
// eslint-disable-next-line no-unused-vars
const faker = require('./helpers/fakeEventGenerator').autoGenerator();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use('/', cleanroutes(routes));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err);
});

module.exports = app;
