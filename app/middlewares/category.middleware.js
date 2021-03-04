'use strict'

const _ = require('lodash')
const generalMiddleware = require('./general.middleware')

///// validating add category
const validateAddCategory = (req, res, done) => {
    const body = req.body
    // get all the errors in an array
    const errorArray = []

    // Name is required, validating it as not empty, valid String and length range.
    if (_.isEmpty(body.name) || !_.isString(body.name) || body.name.length < 2 || body.name.length > 100) {
        errorArray.push({
        field: 'name',
        error: 1000,
        message: '\'name\' is required as string, length must be between 2 and 100.'
        })
    }

    // partnerId Is required, validating as number
    if (!(body.partnerId) || _.isNaN(body.partnerId) || _.isString(body.partnerId)) {
        errorArray.push({
        field: 'partnerId',
        error: 90220,
        message: '\'partnerId\' is required as Numeric .'
        })
    }

    // weekDayId Is required, validating as array
    if (!_.isArray(body.weekDaysId)) {
      errorArray.push({
      field: 'weekDaysId',
      error: 90220,
      message: '\'weekDaysId\' is required as Array .'
      })
  }

    // send array if error(s)
    if (errorArray.length) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'category.middleware.validateAddCategory')
    }

    req.body = body;
    done()
}

///// validating get all categories by partner
const validateGetAllCategories = (req, res, done) => {
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
    const body = req.body
    const param = req.params
    const validatedConditions = {}

    // Validating as not empty, valid numeric value with range.
    if (!param.id || isNaN(param.id)) {
      errorArray.push({
        field: 'id',
        error: 60000,
        message: 'Please provide only valid \'id\' as numeric.'
      })
    }
  
    // name is an required  Validating as not empty, valid String and length range.
    if (!_.isString(body.name) || _.isEmpty(body.name)) {
      errorArray.push({
        field: 'name',
        error: 70000,
        message: 'Please provide only valid \'name\' as string'
      })
    }

  
    if (!_.isEmpty(errorArray)) {
      return generalMiddleware.standardErrorResponse(res, errorArray, 'banner.middleware.validateUpdateCategory')
    }
  
    validatedConditions.title = body.name
    req.conditions = { 
        data: validatedConditions,
        id: param.id 
    }
    done()
}


module.exports = {
    validateAddCategory,
    validateGetAllCategories,
    validateUpdateCategory
}