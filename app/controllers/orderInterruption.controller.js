'use strict'

const SERVER_RESPONSE = require('../config/serverResponses')
const interruptionHelper = require('../helpers/orderInterruption.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// Create New Order
const createInterruption = function (req, res) {
    return interruptionHelper.createInterruption(req.body)
        .then((data) => {
            generalController.successResponse(res, 'Order Interruption created successfully.', data, 'orderInterruption.controller.createInterruption')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'orderInterruption.controller.createInterruption', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'orderInterruption.controller.createInterruption', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

// To Get Errors
const getInterruptions = function (req, res) {
    return interruptionHelper.getOrderInterruptions(req.conditions)
        .then((data) => {
            generalController.successResponse(res, 'Interruptions fetched successfully.', data, 'orderInterruption.controller. getInterruptions')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'orderInterruption.controller. getInterruptions', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'orderInterruption.controller. getInterruptions', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

module.exports = {
    createInterruption,
    getInterruptions
}