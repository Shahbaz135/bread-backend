'use strict'
const generalMiddleware = require('./general.middleware')
const SERVER_RESPONSE = require('../config/serverResponses')
const _ = require('lodash')

// validate ADD Role
const validateAddRole = (req, res, next) => {
  const role = req.body

  // get all the errors in an array
  const errorArray = []

  // name is required, validating it as not empty, valid String and length range.
  if (_.isEmpty(role.name) || !_.isString(role.name) || role.name.length < 2 || role.name.length > 50) {
    errorArray.push({
      field: 'name',
      error: 5549,
      message: '\'name\' is required as string, length must be between 2 and 50.'
    })
  }

  // description is an optional string property, if it is given than validate it.
  if (role.hasOwnProperty('description') && !_.isEmpty(role.description)) {
    // Validating as not empty, valid String and length range.
    if (!_.isString(role.description) || role.description.length < 5 || role.description.length > 200) {
      errorArray.push({
        field: 'description',
        error: 5550,
        message: 'Please provide only valid \'description\' as string, length must be between 5 and 200.'
      })
    }
  }

  // permissions is required, validating it as not an empty array.
  if (role.hasOwnProperty('permissions')) {
    role.permissions.forEach(permission => {
      // moduleName is required, validating it as not empty, valid String and length range.
      if (_.isEmpty(permission.moduleName) || !_.isString(permission.moduleName) || permission.moduleName.length < 3 || permission.moduleName.length > 30) {
        errorArray.push({
          field: 'moduleName',
          error: 5503,
          message: '\'moduleName\' is required as string, length must be between 3 and 30.'
        })
      }

      // actions is an optional string property, if it is given than validate it.
      if (permission.hasOwnProperty('actions')) {
        permission.actions.forEach(action => {
          // Validating as not empty, valid String.
          if (_.isEmpty(action) || !_.isString(action)) {
            errorArray.push({
              field: 'action',
              error: 5504,
              message: 'Please provide only valid \'action\' as string.'
            })
          }
        })
      }
    })
  } else {
    errorArray.push({
      field: 'permissions',
      error: 5502,
      message: '\'permissions\' is required as an array.'
    })
  }

  // Check if error exists
  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'role.middleware.validateAddRole', SERVER_RESPONSE.VALIDATION_ERROR)
  }

  next()
}

// Validate Get Role
const validateGetRoles = (req, res, next) => {
  let role = req.query
  let validatedData = {};

  const errors = []
  // _id is an optional mongo db collection id, if it is given than validate it.
  if (role.hasOwnProperty('id')) {
  // Validating as not empty, mongo db collection id.
    if (_.isEmpty(role.id) || _.isNaN(role.id)) {
      errors.push({
        field: 'id',
        error: 5521,
        message: 'Please provide only valid \'id\'.'
      })
    }
    validatedData.id = role.id;
  }

  validatedData.isDeleted = false;
  req.conditions = validatedData

  next()
}

// Validate update role
const validateUpdateRole = (req, res, next) => {
  const role = req.body
  let validatedRole = {}
  const errorArray = []

  // id is required, validating it as not empty, valid mongo db collection id.
  if (_.isEmpty(req.params.id) || !mongoose.Types.ObjectId.isValid(req.params.id)) {
    errorArray.push({
      field: 'id',
      error: 5548,
      message: 'Valid \'id\' is required.'
    })
  }

  // name is an optional string property, if it is given than validate it.
  if (role.hasOwnProperty('name')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(role.name) || !_.isString(role.name) || role.name.length < 2 || role.name.length > 50) {
      errorArray.push({
        field: 'name',
        error: 5549,
        message: 'Please provide only valid \'name\' as string, length must be between 2 and 50.'
      })
    } else {
      validatedRole.name = role.name
    }
  }

  // description is an optional string property, if it is given than validate it.
  if (role.hasOwnProperty('description')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(role.description) || !_.isString(role.description) || role.description.length < 5 || role.description.length > 100) {
      errorArray.push({
        field: 'description',
        error: 5550,
        message: 'Please provide only valid \'description\' as string, length must be between 5 and 100.'
      })
    }
  }

  // permissions is optional, validating it as not an empty array.
  if (role.hasOwnProperty('permissions')) {
    role.permissions.forEach(permission => {
      // moduleName is required, validating it as not empty, valid String and length range.
      if (_.isEmpty(permission.moduleName) || !_.isString(permission.moduleName) || permission.moduleName.length < 3 || permission.moduleName.length > 30) {
        errorArray.push({
          field: 'moduleName',
          error: 5503,
          message: '\'moduleName\' is required as string, length must be between 3 and 30.'
        })
      }

      // actions is an optional string property, if it is given than validate it.
      if (permission.hasOwnProperty('actions')) {
        permission.actions.forEach(action => {
          // Validating as not empty, valid String.
          if (_.isEmpty(action) || !_.isString(action)) {
            errorArray.push({
              field: 'action',
              error: 5504,
              message: 'Please provide only valid \'action\' as string.'
            })
          }
        })
      }
    })
    validatedRole.permissions = role.permissions
  }

  // isActive is an optional boolean property, if it is given than validate it.
  if (role.hasOwnProperty('isActive')) {
    // Validating as not empty, valid boolean.
    if (!_.isBoolean(role.isActive)) {
      errorArray.push({
        field: 'isActive',
        error: 5561,
        message: 'Please provide only valid \'isActive\' as boolean.'
      })
    }
  }

  // Check if error exists
  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'role.middleware.validateUpdateRole', SERVER_RESPONSE.VALIDATION_ERROR)
  }

  if (_.isEmpty(validatedRole)) {
    return generalMiddleware.standardErrorResponse(res, [{
      field: 'general',
      error: 5552,
      message: 'No data provided to update role.'
    }], 'role.middleware.validateUpdateRole', SERVER_RESPONSE.VALIDATION_ERROR)
  }

  next()
}

// Validate delete role
const validateDeleteRole = (req, res, next) => {
  const errorArray = []

  // id is required, validating it as not empty, valid mongo db collection id.
  if (_.isEmpty(req.params.id) || !mongoose.Types.ObjectId.isValid(req.params.id)) {
    errorArray.push({
      field: 'id',
      error: 5544,
      message: 'Valid \'id\' is required.'
    })
  }

  // Check if error exists
  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'role.middleware.validateDeleteRole', SERVER_RESPONSE.VALIDATION_ERROR)
  }

  next()
}

module.exports = {
  validateAddRole,
  validateGetRoles,
  validateUpdateRole,
  validateDeleteRole
}
