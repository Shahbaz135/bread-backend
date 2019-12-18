'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// validate get user
const validateSearchProducts = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedQuery = {}
  let limit = 50
  let offset = 0

  // name is an optional string property, if it is given than validate it.
  if (query.hasOwnProperty('name')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(query.name)) {
      errorArray.push({
        field: 'name',
        error: 5000,
        message: 'Please provide only valid \'name\' as string.'
      })
    }
    validatedQuery.name = query.name
  }

  // SupplierId is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('SupplierId') && query.SupplierId) {
    // Validating as not empty, valid numeric value with range.
    if (isNaN(query.SupplierId)) {
      errorArray.push({
        field: 'SupplierId',
        error: 5005,
        message: 'Please provide only valid \'SupplierId\' as numeric.'
      })
    }
    validatedQuery.SupplierId = query.SupplierId
  }

  // CategoryId is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('CategoryId') && query.CategoryId) {
    // Validating as not empty, valid numeric value with range.
    if (isNaN(query.CategoryId)) {
      errorArray.push({
        field: 'CategoryId',
        error: 5010,
        message: 'Please provide only valid \'CategoryId\' as numeric.'
      })
    }
    validatedQuery.CategoryId = query.CategoryId
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'user.middleware.validateSearchProducts')
  }

  if (query.limit && query.limit > 0) {
    limit = query.limit
  }

  if (query.offset && query.offset > 0) {
    offset = query.offset
  }

  req.conditions = validatedQuery
  req.limit = limit
  req.offset = offset
  done()
}

// Update Product Validations
const validateUpdateProduct = (req, res, done) => {
  const errorArray = []
  const body = req.body
  let id = req.params.id
  const validatedData = {}

  if (req.user.role != 'Admin') {
    errorArray.push({
      field: 'id',
      error: 1131,
      message: 'You are not allowed to edit this record.'
    })
  }

  // id is required, validating as not empty, valid numeric value with range.
  if (!id || isNaN(id)) {
    errorArray.push({
      field: 'id',
      error: 1132,
      message: '\'id\' is required as numeric in params.'
    })
  }

  // name is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('name')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.name) || !_.isString(body.name) || body.name.length < 2 || body.name.length > 100) {
      errorArray.push({
        field: 'name',
        error: 1133,
        message: 'Please provide only valid \'name\' as string, length must be between 2 and 100.'
      })
    }
    validatedData.name = body.name
  }

  // nameUrdu is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('nameUrdu')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.nameUrdu) || !_.isString(body.nameUrdu) || body.nameUrdu.length < 2 || body.nameUrdu.length > 100) {
      errorArray.push({
        field: 'nameUrdu',
        error: 1133,
        message: 'Please provide only valid \'nameUrdu\' as string, length must be between 2 and 100.'
      })
    }
    validatedData.nameUrdu = body.nameUrdu
  }

  // unit is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('unit')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.unit) || !_.isString(body.unit) || body.unit.length < 2 || body.unit.length > 100) {
      errorArray.push({
        field: 'unit',
        error: 1136,
        message: 'Please provide only valid \'unit\' as string, length must be between 2 and 100.'
      })
    }
    validatedData.unit = body.unit
  }

  // unitUrdu is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('unitUrdu')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.unitUrdu) || !_.isString(body.unitUrdu) || body.unitUrdu.length < 2 || body.unitUrdu.length > 100) {
      errorArray.push({
        field: 'unitUrdu',
        error: 1136,
        message: 'Please provide only valid \'unitUrdu\' as string, length must be between 2 and 100.'
      })
    }
    validatedData.unitUrdu = body.unitUrdu
  }

  // isActive is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('isActive')) {
    // Validating as not empty, valid String and length range.
    if (!body.isActive || (body.isActive != 'true' && body.isActive != 'false')) {
      errorArray.push({
        field: 'isActive ',
        error: 1152,
        message: 'Please provide only valid \'isActive \' as boolean.'
      })
    }
    try {
      validatedData.isActive = JSON.parse(body.isActive)
    } catch (error) {
      console.error(error)
    }
  }

  // Send error Array if error(s).
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'user.middleware.validateUpdateProduct')
  }

  if (_.isEmpty(validatedData)) {
    return generalMiddleware.standardErrorResponse(res, [{
      field: 'general',
      error: 1154,
      message: 'No data provided to update.'
    }], 'user.middleware.validateUpdateProduct')
  }

  req.body = {
    data: validatedData,
    id: id
  }
  return done()
}

const validateDeleteProduct = (req, res, done) => {
  const errorArray = []
  const params = req.params

  if (req.user.role != 'Admin') {
    errorArray.push({
      field: 'id',
      error: 1131,
      message: 'You are not allowed to delete this record.'
    })
  }

  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 1351,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'user.middleware.validateDeleteProduct')
  }
  done()
}

module.exports = {
  validateSearchProducts,
  validateUpdateProduct,
  validateDeleteProduct
}
