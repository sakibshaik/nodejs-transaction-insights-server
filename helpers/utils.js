const _ = require('lodash');
const moment = require('moment');

const utils = [];
const year = (item) => moment(item.date).format('MMM-YYYY');

utils.cleanEvents = (payload) => {
  const result = _.chain(payload)
    .sortBy('date')
    .groupBy('type')
    .mapValues((v) => _.chain(v)
      .groupBy(year)
      .mapValues((w) => _.chain(w)
        .groupBy('category')
        .map((objs, key) => ({
          categories: key,
          amount: _.sumBy(objs, 'amount'),
        })).value()).value())
    .value();
  return result;
};
module.exports = utils;
