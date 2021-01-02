const _ = require('lodash');
const utils = require('../helpers/utils');
const db = require('../helpers/database');

const Controller = {};

Controller.generateInsights = (req, res) => {
  const events = db.getByCustomerId(res.locals.authToken);
  const cleanedData = utils.cleanEvents(events);

  res.status(200).send(cleanedData);
};

// eslint-disable-next-line consistent-return
Controller.authenticator = (req, res, next) => {
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

  // @TODO Can validate if login && password are valid
  if (login && password) {
    res.locals.authToken = b64auth;
    return next();
  }

  return res.status(401).json({ error: 'Authentication required.' });
};

module.exports = Controller;
