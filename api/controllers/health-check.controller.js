const { resourceType } = require('../constants/logger_constants');
const {writeJson} = require('../../writer')

module.exports.getHealthCheck = function getHealthCheck(req, res) {
  console.log({
    methodName: 'entered: getHealthCheck',
    resourceType: resourceType.posService,
    message: 'GET: /v1/health-check',
    payload: new Date(),
  });
  writeJson(
    res,
    {
      message: 'it\'s working ',
    },
    200,
  );
};
