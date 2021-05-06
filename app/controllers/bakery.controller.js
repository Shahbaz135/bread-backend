'use strict'

const SERVER_RESPONSE = require('../config/serverResponses')
const bakeryHelper = require('../helpers/bakery.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')


// Get all categories of partner
const getBakery = function (req, res) {
    return bakeryHelper.getBakery(req.conditions)
        .then((data) => {
            generalController.successResponse(res, 'Bakery fetched successfully.', data, 'bakery.controller.getBakery')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'bakery.controller.getBakery', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'bakery.controller.getBakery', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

// to edit the categories
const updateBakery = function (req, res) {
    return bakeryHelper.updateBakery(req.conditions.data)
        .then((data) => {
            generalController.successResponse(res, 'Bakery updated successfully.', data, 'bakery.controller.updateBakery')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'bakery.controller.updateBakery', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'bakery.controller.updateBakery', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}


module.exports = {
    getBakery,
    updateBakery,
}