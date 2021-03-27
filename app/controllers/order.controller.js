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

// To Get order
const getOrderById = function (req, res) {
    return orderHelper.getOrderById(req.conditions)
        .then((data) => {
            generalController.successResponse(res, 'Orders fetched successfully.', data, 'order.controller. getOrderById')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'order.controller. getOrderById', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'order.controller. getOrderById', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

// To update order
const updateOrder = function (req, res) {
    return orderHelper.updateOrder(req.body.data, req.body.id)
        .then((data) => {
            generalController.successResponse(res, 'Order Updated successfully.', data, 'order.controller. updateOrderById')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'order.controller. updateOrderById', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'order.controller. updateOrderById', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

// To update order
const deleteOrder = function (req, res) {
    return orderHelper.deleteOrder(req.params)
        .then((data) => {
            generalController.successResponse(res, 'Order Deleted successfully.', data, 'order.controller. deleteOrder')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'order.controller. deleteOrder', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'order.controller. deleteOrder', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder
}