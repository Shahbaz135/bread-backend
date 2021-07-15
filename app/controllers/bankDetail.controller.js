'use strict'

const SERVER_RESPONSE = require('../config/serverResponses')
const bankDetailHelper = require('../helpers/bankDetails.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')


// Get all categories of partner
const getBankDetail = function (req, res) {
    return bankDetailHelper.getBankDetail(req.conditions)
        .then((data) => {
            generalController.successResponse(res, 'Detail fetched successfully.', data, 'bankDetail.controller.getBankDetail')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'bankDetail.controller.getBankDetail', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'bankDetail.controller.getBankDetail', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

// to edit the categories
const updateBankDetail = function (req, res) {
    return bankDetailHelper.updateBankDetail(req.conditions.data)
        .then((data) => {
            generalController.successResponse(res, 'Details updated successfully.', data, 'bankDetail.controller.updateBankDetail')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'bankDetail.controller.updateBankDetail', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'bankDetail.controller.updateBankDetail', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}


module.exports = {
    getBankDetail,
    updateBankDetail,
}