'use strict'

const SERVER_RESPONSE = require('../config/serverResponses')
const nonDayHelper = require('../helpers/nonDeliveryDays.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// Create New category
const addDay = function (req, res) {
    return nonDayHelper.addDay(req.body)
        .then((data) => {
            generalController.successResponse(res, 'Non Delivery Day created successfully.', data, 'nonDeliveryDays.controller.addDay')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'nonDeliveryDays.controller.addDay', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'nonDeliveryDays.controller.addDay', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

// Get all categories of partner
const getAllDays = function (req, res) {
    return nonDayHelper.getAllDays(req.conditions)
        .then((data) => {
            generalController.successResponse(res, 'Non Delivery Days fetched successfully.', data, 'nonDeliveryDays.controller.getAllDays')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'nonDeliveryDays.controller.getAllDays', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'nonDeliveryDays.controller.getAllDays', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

// Get all categories of partner
const clearDay = function (req, res) {
    return nonDayHelper.deleteDay(req.params)
        .then((data) => {
            generalController.successResponse(res, 'Non Delivery Day Cleared successfully.', data, 'nonDeliveryDays.controller.clearDay')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'nonDeliveryDays.controller.clearDay', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'nonDeliveryDays.controller.clearDay', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

module.exports = {
    addDay,
    getAllDays,
    clearDay
}