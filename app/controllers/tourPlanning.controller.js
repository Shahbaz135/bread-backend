'use strict'

const SERVER_RESPONSE = require('../config/serverResponses')
const tourHelper = require('../helpers/tourPlanning.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// Create New Tour
const createTour = function (req, res) {
    return tourHelper.createTour(req.body)
        .then((data) => {
            generalController.successResponse(res, 'Tour created successfully.', data, 'tourPlanning.controller.createTour')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'tourPlanning.controller.createTour', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'tourPlanning.controller.createTour', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

// To Get Tours
const getTours = function (req, res) {
    return tourHelper.getTours(req.conditions)
        .then((data) => {
            generalController.successResponse(res, 'Orders fetched successfully.', data, 'tourPlanning.controller. getTours')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'tourPlanning.controller. getTours', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'tourPlanning.controller. getTours', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

module.exports = {
    createTour,
    getTours
}