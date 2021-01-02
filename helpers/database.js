const Loki = require('lokijs');

const insights = new Loki('insights');
const transactions = insights.addCollection('transactions', { indices: ['customer_id'] });

const dbHelper = [];

dbHelper.insert = (payload) => {
  transactions.insert(payload);
};

dbHelper.getByCustomerId = (customerId) => {
  const payload = transactions.find({
    customer_id: customerId,
  });
  return payload;
};

dbHelper.get = () => {
  const payload = transactions.find();
  return payload;
};

module.exports = dbHelper;
