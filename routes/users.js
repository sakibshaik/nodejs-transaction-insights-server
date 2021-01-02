const controller = require('../controllers/index');

const paths = [
  {
    path: '/users/insights',
    method: 'get',
    middlewares: [controller.authenticator],
    handlers: controller.generateInsights,
  },
];


module.exports = paths;
