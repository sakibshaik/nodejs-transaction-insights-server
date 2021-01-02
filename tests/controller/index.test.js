const { expect } = require('chai');

const controller = require('../../controllers/index');
const db = require('../../helpers/database');

function seedData() {
  const seedEvents = [
    {
      customer_id: 'dGVzdDp0ZXN0MTIz',
      amount: 405.46,
      date: '2020-06-03T06:32:25.441Z',
      description: 'deposit transaction at Legros, Ledner and Bahringer using card ending with ***0462 for NZD 631.62 in account ***22991578',
      type: 'debit',
      category: 'Bills',
      merchant: 'British Gas',
    },
    {
      customer_id: 'dGVzdDp0ZXN0MTIz',
      amount: 233.27,
      date: '2020-07-26T03:26:07.311Z',
      description: 'withdrawal transaction at Marvin, Veum and Mills using card ending with ***2753 for VUV 218.48 in account ***81298351',
      type: 'debit',
      category: 'groceries',
      merchant: 'costas',
    },
    {
      customer_id: 'dGVzdDp0ZXN0MTIz',
      amount: 900.44,
      date: '2020-12-06T08:29:16.989Z',
      description: 'withdrawal transaction at Kris Group using card ending with ***7514 for NPR 79.6 in account ***38481163',
      type: 'debit',
      category: 'shopping',
      merchant: 'Vodafone',
    },
    {
      customer_id: 'dGVzdDp0ZXN0MTIz',
      amount: 429.82,
      date: '2020-07-14T16:11:15.127Z',
      description: 'payment transaction at Gusikowski Inc using card ending with ***3431 for BZD 888.97 in account ***71257219',
      type: 'debit',
      category: 'transport',
      merchant: 'Tescos',
    },
    {
      customer_id: 'dGVzdDp0ZXN0MTIz',
      amount: 974.83,
      date: '2020-02-17T04:26:07.864Z',
      description: 'withdrawal transaction at Sawayn and Sons using card ending with ***1932 for MVR 640.62 in account ***43482421',
      type: 'debit',
      category: 'eating out',
      merchant: 'British Gas',
    },
    {
      customer_id: 'dGVzdDp0ZXN0MTIz',
      amount: 100000.83,
      date: '2020-02-17T04:26:07.864Z',
      description: 'withdrawal transaction at Sawayn and Sons using card ending with ***1932 for MVR 640.62 in account ***43482421',
      type: 'credit',
      category: 'salary',
      merchant: 'bank transfer',
    },
  ];
  for (let i = 0; i <= seedEvents.length - 1; i++) {
    db.insert(seedEvents[i]);
  }
}

describe('authenticator test', () => {
  it('should authorize when credentials are provided', (done) => {
    const req = {
      headers: {
        authorization: 'Basic dGVzdDp0ZXN0MTIz',
      },
    };
    const res = {
      locals: {},

    };
    const next = () => {
      expect(res.locals.authToken).to.equal(req.headers.authorization.split(' ')[1]);
      done();
    };
    controller.authenticator(req, res, next);
  });

  it('should return 401 if auth header is not provided', (done) => {
    const req = {
      headers: {},
    };
    const res = {
      locals: {},
      status: (status) => ({
        json: (message) => {
          expect(status).to.equal(401);
          expect(message.error).to.equal('Authentication required.');
          done();
        },
      }),

    };
    const next = () => {};
    controller.authenticator(req, res, next);
  });
});

describe('retreive insight test', () => {
  it('should generate the skeletal insight as a response for a valid customer id', (done) => {
    seedData();
    const customerId = 'dGVzdDp0ZXN0MTIz';
    const req = {};
    const res = {
      locals: {
        authToken: customerId,
      },
      status: (status) => ({
        send: (message) => {
          expect(status).to.equal(200);
          expect(message).to.deep.equal({
            credit: { 'Feb-2020': [{ categories: 'salary', amount: 100000.83 }] },
            debit: {
              'Feb-2020': [{ categories: 'eating out', amount: 974.83 }], 'Jun-2020': [{ categories: 'Bills', amount: 405.46 }], 'Jul-2020': [{ categories: 'transport', amount: 429.82 }, { categories: 'groceries', amount: 233.27 }], 'Dec-2020': [{ categories: 'shopping', amount: 900.44 }],
            },
          });
          done();
        },
      }),

    };
    controller.generateInsights(req, res);
  });

  it('should return empy response for the customer not present', (done) => {
    const customerId = 'invalid-customer';
    const req = {};
    const res = {
      locals: {
        authToken: customerId,
      },
      status: (status) => ({
        send: (message) => {
          expect(status).to.equal(200);
          expect(message).to.deep.equal({});
          done();
        },
      }),

    };
    controller.generateInsights(req, res);
  });
});
