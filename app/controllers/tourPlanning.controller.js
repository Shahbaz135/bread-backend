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
    return tourHelper.getTours(req.conditions, req.daysQuery)
        .then((data) => {
            generalController.successResponse(res, 'Tours fetched successfully.', data, 'tourPlanning.controller.getTours')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'tourPlanning.controller.getTours', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'tourPlanning.controller.getTours', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

// To Update Tours
const updateTour = function (req, res) {
    return tourHelper.updateTour(req.body.data, req.body.id)
        .then((data) => {
            generalController.successResponse(res, 'Tour updated successfully.', data, 'tourPlanning.controller.updateTour')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'tourPlanning.controller.updateTour', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'tourPlanning.controller.updateTour', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

// To Delete Tours
const deleteTour = function (req, res) {
    return tourHelper.deleteTour(req.params)
        .then((data) => {
            generalController.successResponse(res, 'Tour deleted successfully.', data, 'tourPlanning.controller.deleteTour')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'tourPlanning.controller.deleteTour', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'tourPlanning.controller.deleteTour', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

module.exports = {
    createTour,
    getTours,
    updateTour,
    deleteTour
}