const { expect } = require('chai');
const utils = require('../../helpers/utils');

describe('utils helper tests', () => {
  const events = [
    {
      customer_id: 'YnJldDpicmV0MTIz',
      amount: 750.01,
      date: '2020-01-03T03:08:46.016Z',
      description: 'payment transaction at Goldner, Cummerata and Hegmann using card ending with ***1045 for GEL 19.62 in account ***45242977',
      type: 'debit',
      category: 'transport',
      merchant: 'Vodafone',
      meta: {
        revision: 0,
        created: 1609254270582,
        version: 0,
      },
      $loki: 1,
    },
    {
      customer_id: 'YnJldDpicmV0MTIz',
      amount: 417.97,
      date: '2020-10-01T07:15:27.672Z',
      description: 'withdrawal transaction at Heidenreich Inc using card ending with ***7472 for BZD 295.58 in account ***83685950',
      type: 'debit',
      category: 'shopping',
      merchant: 'Vodafone',
      meta: {
        revision: 0,
        created: 1609254275582,
        version: 0,
      },
      $loki: 3,
    },
    {
      customer_id: 'YnJldDpicmV0MTIz',
      amount: 378.55,
      date: '2020-06-10T23:42:15.584Z',
      description: 'payment transaction at Schoen - Ebert using card ending with ***0403 for PYG 656.74 in account ***97282974',
      type: 'credit',
      category: 'salary',
      merchant: 'google inc.',
      meta: {
        revision: 0,
        created: 1609254275583,
        version: 0,
      },
      $loki: 6,
    },
    {
      customer_id: 'YnJldDpicmV0MTIz',
      amount: 9.66,
      date: '2020-11-06T21:48:52.244Z',
      description: 'payment transaction at Green - Gottlieb using card ending with ***5821 for SLL 750.58 in account ***15115586',
      type: 'credit',
      category: 'salary',
      merchant: 'google inc.',
      meta: {
        revision: 0,
        created: 1609254280583,
        version: 0,
      },
      $loki: 7,
    },
    {
      customer_id: 'YnJldDpicmV0MTIz',
      amount: 823.88,
      date: '2020-12-08T05:31:21.236Z',
      description: 'invoice transaction at Hamill Group using card ending with ***2590 for NAD 59.9 in account ***70655793',
      type: 'debit',
      category: 'transport',
      merchant: 'Vodafone',
      meta: {
        revision: 0,
        created: 1609254285583,
        version: 0,
      },
      $loki: 8,
    },
    {
      customer_id: 'YnJldDpicmV0MTIz',
      amount: 616.5,
      date: '2020-07-19T19:26:05.017Z',
      description: 'withdrawal transaction at Wisozk, Stokes and Labadie using card ending with ***4601 for XAG 157.17 in account ***25328038',
      type: 'debit',
      category: 'shopping',
      merchant: 'Tescos',
      meta: {
        revision: 0,
        created: 1609254285584,
        version: 0,
      },
      $loki: 9,
    },
    {
      customer_id: 'YnJldDpicmV0MTIz',
      amount: 505.39,
      date: '2020-07-21T14:50:27.957Z',
      description: 'deposit transaction at Howe and Sons using card ending with ***0834 for TZS 970.7 in account ***42743298',
      type: 'debit',
      category: 'eating out',
      merchant: 'costas',
      meta: {
        revision: 0,
        created: 1609254285584,
        version: 0,
      },
      $loki: 10,
    },
    {
      customer_id: 'YnJldDpicmV0MTIz',
      amount: 230.77,
      date: '2020-04-09T08:19:48.009Z',
      description: 'invoice transaction at Bogan and Sons using card ending with ***4745 for PGK 792.58 in account ***02327979',
      type: 'debit',
      category: 'shopping',
      merchant: 'Tescos',
      meta: {
        revision: 0,
        created: 1609254290586,
        version: 0,
      },
      $loki: 14,
    },
  ];
  it('should clean the events and segregate it', (done) => {
    const cleanedData = utils.cleanEvents(events);
    const expected = {
      debit: {
        'Jan-2020': [
          {
            categories: 'transport',
            amount: 750.01,
          },
        ],
        'Apr-2020': [
          {
            categories: 'shopping',
            amount: 230.77,
          },
        ],
        'Jul-2020': [
          {
            categories: 'shopping',
            amount: 616.5,
          },
          {
            categories: 'eating out',
            amount: 505.39,
          },
        ],
        'Oct-2020': [
          {
            categories: 'shopping',
            amount: 417.97,
          },
        ],
        'Dec-2020': [
          {
            categories: 'transport',
            amount: 823.88,
          },
        ],
      },
      credit: {
        'Jun-2020': [
          {
            categories: 'salary',
            amount: 378.55,
          },
        ],
        'Nov-2020': [
          {
            categories: 'salary',
            amount: 9.66,
          },
        ],
      },
    };
    expect(cleanedData).to.deep.equal(expected)
    done();
  });
});
