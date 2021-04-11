'use strict'

const SERVER_RESPONSE = require('../config/serverResponses')
const customerHelper = require('../helpers/customer.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// Create New Partner
const register = function (req, res) {
    return customerHelper.registration(req.body)
        .then((data) => {
            generalController.successResponse(res, 'Customer Registered successfully.', data, 'customer.controller.register')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'customer.controller.register', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'customer.controller.register', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

//// customer login
const login = function (req, res) {
    return customerHelper.login(req.body)
        .then((data) => {
            generalController.successResponse(res, 'Logged in successful.', data, 'customer.controller.login')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'customer.controller.login', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'customer.controller.login', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

const updateCustomer = function (req, res) {
    return customerHelper.updateCustomer(req.body.data, req.body.id)
      .then(function (data) {
        generalController.successResponse(res, 'Successfully updated the customer', data, 'customer.controller.updateCustomer')
      }).catch(StandardError, function (err) {
        generalController.errorResponse(res, err, null, 'customer.controller.updateCustomer', SERVER_RESPONSE.VALIDATION_ERROR)
      }).catch(function (err) {
        generalController.errorResponse(res, err, 'Please check originalError for details', 'customer.controller.updateCustomer', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
      })
  }

const getCustomerById = function (req, res) {
    return customerHelper.getCustomerById(req.conditions)
        .then(function (data) {
        generalController.successResponse(res, 'Successfully updated the customer', data, 'customer.controller.getCustomerById')
        }).catch(StandardError, function (err) {
        generalController.errorResponse(res, err, null, 'customer.controller.getCustomerById', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch(function (err) {
        generalController.errorResponse(res, err, 'Please check originalError for details', 'customer.controller.getCustomerById', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const checkPassword = function (req, res) {
    return customerHelper.checkPassword(req.conditions)
        .then(function (data) {
        generalController.successResponse(res, 'Password is valid', data, 'customer.controller.checkPassword')
        }).catch(StandardError, function (err) {
        generalController.errorResponse(res, err, null, 'customer.controller.checkPassword', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch(function (err) {
        generalController.errorResponse(res, err, 'Please check originalError for details', 'customer.controller.checkPassword', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const changePassword = function (req, res) {
    return customerHelper.changePassword(req.conditions)
        .then(function (data) {
        generalController.successResponse(res, 'Password updated successfully', data, 'customer.controller.changePassword')
        }).catch(StandardError, function (err) {
        generalController.errorResponse(res, err, null, 'customer.controller.changePassword', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch(function (err) {
        generalController.errorResponse(res, err, 'Please check originalError for details', 'customer.controller.changePassword', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// Create New Partner
const createCustomer = function (req, res) {
    return customerHelper.createCustomer(req.body)
        .then((data) => {
            generalController.successResponse(res, 'Customer Created successfully.', data, 'customer.controller.createCustomer')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'customer.controller.createCustomer', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'customer.controller.createCustomer', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

const getAllCustomers = function (req, res) {
    return customerHelper.getAllCustomers(req.conditions)
        .then(function (data) {
        generalController.successResponse(res, 'Successfully fetched customers', data, 'customer.controller.getAllCustomers')
        }).catch(StandardError, function (err) {
        generalController.errorResponse(res, err, null, 'customer.controller.getAllCustomers', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch(function (err) {
        generalController.errorResponse(res, err, 'Please check originalError for details', 'customer.controller.getAllCustomers', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const deleteCustomer = function (req, res) {
    return customerHelper.deleteCustomer(req.params)
        .then(function (data) {
        generalController.successResponse(res, 'Successfully deleted customer', data, 'customer.controller.deleteCustomer')
        }).catch(StandardError, function (err) {
        generalController.errorResponse(res, err, null, 'customer.controller.deleteCustomer', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch(function (err) {
        generalController.errorResponse(res, err, 'Please check originalError for details', 'customer.controller.deleteCustomer', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}



module.exports = {
    register,
    login,
    updateCustomer,
    getCustomerById,
    checkPassword,
    changePassword,
    createCustomer,
    getAllCustomers,
    deleteCustomer
    // getPartnerByPostalCode,
    // getAllPartners
  }