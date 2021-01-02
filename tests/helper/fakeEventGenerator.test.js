const { expect } = require('chai');
const faker = require('../../helpers/fakeEventGenerator');

describe('fakeEventsGenerator tests', () => {
  it('should generate expected fake events payload', (done) => {
    const data = faker.generateRandomData();
    expect(data).to.have.key('customer_id', 'amount', 'date', 'description', 'type', 'category', 'merchant');
    done();
  });
});
