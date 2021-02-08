'use strict'

const SERVER_RESPONSE = require('../config/serverResponses')
const orderHelper = require('../helpers/order.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// Create New Order
const createOrder = function (req, res) {
    return orderHelper.createOrder(req.body)
        .then((data) => {
            generalController.successResponse(res, 'Order created successfully.', data, 'order.controller.createOrder')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'order.controller.createOrder', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'order.controller.createOrder', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

// To Get Errors
const getOrders = function (req, res) {
    return orderHelper.getOrder(req.conditions)
        .then((data) => {
            generalController.successResponse(res, 'Orders fetched successfully.', data, 'order.controller. getOrders')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'order.controller. getOrders', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'order.controller. getOrders', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

module.exports = {
    createOrder,
    getOrders
}