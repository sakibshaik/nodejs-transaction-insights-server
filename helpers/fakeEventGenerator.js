const faker = require('faker');
const db = require('./database');

const frequency = process.env.GENERATORFREQUENCY || 5000;

const helpers = [];

helpers.users = [];
helpers.users.push({ username: 'sakib', password: 'sakib123' });
helpers.users.push({ username: 'amit', password: 'amit123' });
helpers.users.push({ username: 'bret', password: 'bret123' });

helpers.getTransactionType = () => {
  const transactions = ['credit', 'debit'];
  const spendCategories = ['Bills', 'eating out', 'groceries', 'shopping', 'transport'];
  const incomeCategories = ['salary', 'transfers'];
  const merchants = ['Vodafone', 'British Gas', 'Tescos', 'costas'];
  const senders = ['google inc.', 'paypal', 'bank transfer'];
  const transactionType = {};
  const user = helpers.users[Math.floor(Math.random() * helpers.users.length)];
  transactionType.customer_id = Buffer.from(`${user.username}:${user.password}`).toString('base64');
  transactionType.type = transactions[Math.floor(Math.random() * transactions.length)];
  transactionType.category = transactionType.type === 'debit' ? spendCategories[Math.floor(Math.random() * spendCategories.length)] : incomeCategories[Math.floor(Math.random() * incomeCategories.length)];
  transactionType.merchant = transactionType.type === 'debit' ? merchants[Math.floor(Math.random() * merchants.length)] : senders[Math.floor(Math.random() * senders.length)];
  return transactionType;
};

function generateRandomData() {
  const transactionType = helpers.getTransactionType();
  return {
    customer_id: transactionType.customer_id,
    amount: faker.finance.amount(),
    date: faker.date.past(),
    description: faker.finance.transactionDescription(),
    type: transactionType.type,
    category: transactionType.category,
    merchant: transactionType.merchant,
  };
}

function autoGenerator() {
  const randomNumber = Math.floor(Math.random() * 10);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i <= randomNumber; i++) {
    db.insert(generateRandomData());
  }
}

setInterval(() => autoGenerator(), frequency);

module.exports = { generateRandomData, autoGenerator };
