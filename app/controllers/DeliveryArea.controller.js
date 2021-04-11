'use strict'

const SERVER_RESPONSE = require('../config/serverResponses')
const deliveryAreaHelper = require('../helpers/DeliveryArea.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// Create New Order
const addDeliveryArea = function (req, res) {
    return deliveryAreaHelper.addDeliveryArea(req.body)
        .then((data) => {
            generalController.successResponse(res, 'Delivery area added successfully.', data, 'DeliveryArea.controller.addDeliveryArea')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'DeliveryArea.controller.addDeliveryArea', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'DeliveryArea.controller.addDeliveryArea', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

const updateDeliveryArea = function (req, res) {
    return deliveryAreaHelper.updateDeliveryArea(req.body.data, req.body.id)
        .then((data) => {
            generalController.successResponse(res, 'Delivery area added successfully.', data, 'DeliveryArea.controller.updateDeliveryArea')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'DeliveryArea.controller.updateDeliveryArea', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'DeliveryArea.controller.updateDeliveryArea', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

const getDeliveryArea = function (req, res) {
    return deliveryAreaHelper.deliveryAreasList(req.conditions)
        .then((data) => {
            generalController.successResponse(res, 'Delivery area fetched successfully.', data, 'DeliveryArea.controller.getDeliveryArea')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'DeliveryArea.controller.getDeliveryArea', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'DeliveryArea.controller.getDeliveryArea', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

const deleteDeliveryArea = function (req, res) {
    return deliveryAreaHelper.deleteDeliveryArea(req.params)
        .then((data) => {
            generalController.successResponse(res, 'Delivery area deleted successfully.', data, 'DeliveryArea.controller.deleteDeliveryArea')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'DeliveryArea.controller.deleteDeliveryArea', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'DeliveryArea.controller.deleteDeliveryArea', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

module.exports = {
    addDeliveryArea,
    updateDeliveryArea,
    getDeliveryArea,
    deleteDeliveryArea
}