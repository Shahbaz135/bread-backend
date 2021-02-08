'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const partnerHelper = require('../helpers/partner.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// Create New Partner
const register = function (req, res) {
    return partnerHelper.registration(req.body, req.file)
      .then((data) => {
        generalController.successResponse(res, 'Partner Register successfully.', data, 'partner.controller.register')
      }).catch(StandardError, (err) => {
        generalController.errorResponse(res, err, null, 'partner.controller.register', SERVER_RESPONSE.VALIDATION_ERROR)
      }).catch((err) => {
        generalController.errorResponse(res, err, 'Please check originalError for details', 'partner.controller.register', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
      })
}

const login = function (req, res) {
  return partnerHelper.login(req.body)
    .then((data) => {
      generalController.successResponse(res, 'User login successfully.', data, 'partner.controller.login')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'partner.controller.login', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'partner.controller.login', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const getPartnerByPostalCode = function (req, res) {
  return partnerHelper.getPartnerByPostalCode(req.conditions)
    .then((data) => {
      generalController.successResponse(res, 'Partner fetched successfully.', data, 'partner.controller.getPartnerByPostalCode')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'partner.controller.getPartnerByPostalCode', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'partner.controller.getPartnerByPostalCode', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const getAllPartners = function (req, res) {
  return partnerHelper.getAllPartners(req.query)
    .then((data) => {
      generalController.successResponse(res, 'Partner fetched successfully.', data, 'partner.controller.getAllPartners')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'partner.controller.getAllPartners', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'partner.controller.getAllPartners', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  register,
  login,
  getPartnerByPostalCode,
  getAllPartners
}