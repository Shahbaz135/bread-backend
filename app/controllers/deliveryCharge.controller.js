'use strict'

const SERVER_RESPONSE = require('../config/serverResponses')
const chargesHelper = require('../helpers/deliveryCharges.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')


// Get all categories of partner
const getDeliveryCharges = function (req, res) {
    return chargesHelper.getDeliveryCharges(req.conditions)
        .then((data) => {
            generalController.successResponse(res, 'Delivery Charge fetched successfully.', data, 'deliveryCharge.controller.getDeliveryCharges')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'deliveryCharge.controller.getDeliveryCharges', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'deliveryCharge.controller.getDeliveryCharges', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

// to edit the categories
const updateCharge = function (req, res) {
    return chargesHelper.updateCharges(req.conditions.data)
        .then((data) => {
            generalController.successResponse(res, 'Delivery Charge updated successfully.', data, 'deliveryCharge.controller.updateCharge')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'deliveryCharge.controller.updateCharge', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'deliveryCharge.controller.updateCharge', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}


module.exports = {
    getDeliveryCharges,
    updateCharge,
}