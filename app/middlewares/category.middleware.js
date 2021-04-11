'use strict'

const _ = require('lodash')
const generalMiddleware = require('./general.middleware')

///// validating add category
const validateAddCategory = (req, res, done) => {
    const body = req.body
    // get all the errors in an array
    const errorArray = []
    const validatedConditions = {};

    // Name is required, validating it as not empty, valid String and length range.
    if (_.isEmpty(body.name) || !_.isString(body.name) || body.name.length < 2 || body.name.length > 200) {
      errorArray.push({
        field: 'name',
        error: 1000,
        message: '\'name\' is required as string, length must be between 2 and 100.'
      })
    }
    validatedConditions.title = body.name;

    // partnerId Is required, validating as number
    if (body.hasOwnProperty('partnerId') && body.partnerId) {
      if (!(body.partnerId) || _.isNaN(body.partnerId) || _.isString(body.partnerId)) {
        errorArray.push({
          field: 'partnerId',
          error: 90220,
          message: '\'partnerId\' is required as Numeric .'
        })
      }
      validatedConditions.PartnerId = body.partnerId;
    }

    // userId Is required, validating as number
    if (body.hasOwnProperty('userId') && body.userId) {
      if (!(body.userId) || _.isNaN(body.userId) || _.isString(body.userId)) {
        errorArray.push({
          field: 'userId',
          error: 90220,
          message: '\'userId\' is required as Numeric .'
        })
      }
      validatedConditions.UserId = body.userId;
    }

    // send array if error(s)
    if (errorArray.length) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'category.middleware.validateAddCategory')
    }

    validatedConditions.weekDaysId = [1,2,3,4,5,6,7];
    req.body = validatedConditions;
    done()
}

///// validating get all categories by partner
const validateGetAllCategories = (req, res, done) => {
    const errorArray = []
    const query = req.query
    const validatedQuery = {}

    // partnerId Is required, validating as number
    if (query.hasOwnProperty('partnerId') && query.partnerId) {
      if (!(query.partnerId) || _.isNaN(query.partnerId)) {
        errorArray.push({
          field: 'partnerId',
          error: 90220,
          message: '\'partnerId\' is required as Numeric .'
        })
      }
      validatedQuery.PartnerId = query.partnerId
    }

    // Id Is required, validating as number
    if (query.hasOwnProperty('id') && query.id) {
      if (!(query.id) || _.isNaN(query.id)) {
        errorArray.push({
          field: 'id',
          error: 90220,
          message: '\'id\' is required as Numeric .'
        })
      }
      validatedQuery.id = query.id
    }

    // Id Is required, validating as number
    if (query.hasOwnProperty('userId') && query.userId) {
      if (!(query.userId) || _.isNaN(query.userId)) {
        errorArray.push({
          field: 'userId',
          error: 90220,
          message: '\'userId\' is required as Numeric .'
        })
      }
      validatedQuery.UserId = query.userId
    }
    

    // day id Is required, validating as number
    // if (!(query.dayId) || _.isNaN(query.dayId)) {
    //   errorArray.push({
    //   field: 'dayId',
    //   error: 90220,
    //   message: '\'dayId\' is required as Numeric .'
    //   })
    // }

    // send array if error(s)
    if (errorArray.length) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'category.middleware.validateGetAllCategories')
    }

    validatedQuery.isDeleted = false;
    req.conditions = validatedQuery;
    done()
}

///// validating get all categories by partner
const validateGetCategoriesByArea = (req, res, done) => {
  const errorArray = []
  const query = req.query

  // partnerId Is required, validating as number
  if (!(query.partnerId) || _.isNaN(query.partnerId)) {
      errorArray.push({
      field: 'partnerId',
      error: 90220,
      message: '\'partnerId\' is required as Numeric .'
      })
  }

  // day id Is required, validating as number
  // if (!(query.dayId) || _.isNaN(query.dayId)) {
  //   errorArray.push({
  //   field: 'dayId',
  //   error: 90220,
  //   message: '\'dayId\' is required as Numeric .'
  //   })
  // }

  // send array if error(s)
  if (errorArray.length) {
      return generalMiddleware.standardErrorResponse(res, errorArray, 'category.middleware.validateGetAllCategories')
  }

  req.conditions = query;
  done()
}

////// validating update category
const validateUpdateCategory = (req, res, done) => {
    const errorArray = []
    const query = req.body
    const param = req.params
    const validatedQuery = {}

    // Validating as not empty, valid numeric value with range.
    if (!param.id || isNaN(param.id)) {
      errorArray.push({
        field: 'id',
        error: 60000,
        message: 'Please provide only valid \'id\' as numeric.'
      })
    }
  
    // name is an required  Validating as not empty, valid String and length range.
    if (query.hasOwnProperty('name') && query.name) {
      if (!_.isString(query.name) || _.isEmpty(query.name)) {
        errorArray.push({
          field: 'name',
          error: 70000,
          message: 'Please provide only valid \'name\' as string'
        })
      }
      validatedQuery.title = query.name;
    }

    if (query.hasOwnProperty('partnerId') && query.partnerId) {
      if (!_.isString(query.partnerId) || _.isEmpty(query.partnerId)) {
        errorArray.push({
          field: 'partnerId',
          error: 70000,
          message: 'Please provide only valid \'partnerId\' as string'
        })
      }
      validatedQuery.PartnerId = query.partnerId;
    }

  
    if (!_.isEmpty(errorArray)) {
      return generalMiddleware.standardErrorResponse(res, errorArray, 'banner.middleware.validateUpdateCategory')
    }
  
    req.conditions = { 
        data: validatedQuery,
        id: param.id 
    }
    done()
}

const validateDeleteCategory = (req, res, done) => {
  const errorArray = []
  const params = req.params

  // if (req.user.role != 'Admin') {
  //   errorArray.push({
  //     field: 'id',
  //     error: 1131,
  //     message: 'You are not allowed to delete this record.'
  //   })
  // }

  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 1351,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'category.middleware.validateDeleteCategory')
  }
  done()
}


module.exports = {
  validateAddCategory,
  validateGetAllCategories,
  validateUpdateCategory,
  validateGetCategoriesByArea,
  validateDeleteCategory
}