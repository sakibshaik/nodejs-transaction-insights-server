const { expect } = require('chai');
const sinon = require('sinon');

const routes = require('../../routes/index');
const controller = require('../../controllers/index');

describe('routes sanity', () => {
  it('should have valid routes and methods or users path', () => {
    expect(routes[0][0].path).to.equal('/users/insights');
    expect(routes[0][0].method).to.equal('get');
    expect(routes[0][0].middlewares[0].toString()).to.equal(controller.authenticator.toString());
    expect(routes[0][0].handlers.toString()).to.equal(controller.generateInsights.toString());
  });
});
