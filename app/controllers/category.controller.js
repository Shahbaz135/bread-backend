'use strict'

const SERVER_RESPONSE = require('../config/serverResponses')
const categoryHelper = require('../helpers/category.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// Create New category
const createCategory = function (req, res) {
    return categoryHelper.createCategory(req.body)
        .then((data) => {
            generalController.successResponse(res, 'Category created successfully.', data, 'category.controller.register')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'category.controller.register', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'category.controller.register', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

// Get all categories of partner
const getAllCategories = function (req, res) {
    return categoryHelper.AllCategoriesByDay(req.conditions)
        .then((data) => {
            generalController.successResponse(res, 'Category fetched successfully.', data, 'category.controller.getAllCategories')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'category.controller.getAllCategories', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'category.controller.getAllCategories', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

// Get all categories of partner
const getCategoriesByAreaRegular = function (req, res) {
    return categoryHelper.getCategoriesByDeliveryAreaRegular(req.conditions)
        .then((data) => {
            generalController.successResponse(res, 'Category fetched successfully.', data, 'category.controller.getCategoriesByAreaRegular')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'category.controller.getCategoriesByAreaRegular', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'category.controller.getCategoriesByAreaRegular', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

// to edit the categories
const updateCategories = function (req, res) {
    return categoryHelper.editCategory(req.conditions.data, req.conditions.id)
        .then((data) => {
            generalController.successResponse(res, 'Category updated successfully.', data, 'category.controller.register')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'category.controller.updateCategories', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'category.controller.updateCategories', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}


module.exports = {
    createCategory,
    getAllCategories,
    updateCategories,
    getCategoriesByAreaRegular
}