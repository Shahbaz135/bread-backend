'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const productHelper = require('../helpers/product.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// Search Products
const searchProducts = function (req, res) {
  return productHelper.searchProducts(req.conditions, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, 'Products searched successfully.', data, 'product.controller.searchProducts')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'product.controller.searchProducts', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'product.controller.searchProducts', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const updateProduct = function (req, res) {
  return productHelper.updateProduct(req.body.data, req.body.id)
    .then(function (data) {
      generalController.successResponse(res, 'Successfully update the product info', data, 'product.controller.updateProduct')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'product.controller.updateProduct', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'product.controller.updateProduct', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const deleteProduct = (req, res) => {
  return productHelper.deleteProduct(req.params)
    .then(function (data) {
      generalController.successResponse(res, 'Product deleted successfully', data, 'product.controller.deleteProduct')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'product.controller.deleteProduct', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'product.controller.deleteProduct', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  searchProducts,
  updateProduct,
  deleteProduct
}
