'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')

function standardErrorResponse (res, err, type, statusCode) {
  let code = SERVER_RESPONSE.VALIDATION_ERROR
  statusCode = parseInt(statusCode)
  if (!isNaN(statusCode)) {
    code = statusCode
  }
  return res.status(code)
    .send({
      status: 'Error',
      message: err,
      location: type
    })
}

module.exports = {
  standardErrorResponse
}
