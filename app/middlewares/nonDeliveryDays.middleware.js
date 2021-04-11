'use strict'

const { body } = require('express-validator/check')
const _ = require('lodash')
const generalMiddleware = require('./general.middleware')

///// validating add category
const validateAddDay = (req, res, done) => {
    const body = req.body
    // get all the errors in an array
    const errorArray = []

    // day is required, validating it as not empty, valid String and length range.
    if (!_.isString(body.day) || _.isEmpty(body.day)) {
            errorArray.push({
            field: 'day',
            error: 1000,
            message: '\'day\' is required as date'
        })
    }

    // is active is required, validating it as boolean
    if (!_.isBoolean(body.showOnCustomerPortal)) {
            errorArray.push({
            field: 'showOnCustomerPortal',
            error: 1015,
            message: '\'showOnCustomerPortal\' is required as boolean.'
        })
    }

    // send array if error(s)
    if (errorArray.length) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'nonDeliveryDays.middleware.validateAddDay')
    }

    req.body = body;
    done()
}

///// validating get all categories by partner
const validateGetAlDays = (req, res, done) => {
    const errorArray = []
    const query = req.query
    const validatedData = {};

    // partnerId Is required, validating as number
    if (body.hasOwnProperty('userId') && body.userId) {
        if (!(query.userId) || _.isNaN(query.userId)) {
            errorArray.push({
            field: 'userId',
            error: 90220,
            message: '\'userId\' is required as Numeric .'
            })
        }
        validatedData.UserId = query.userId;
    }

    // send array if error(s)
    if (errorArray.length) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'nonDeliveryDays.middleware.validateGetAllCategories')
    }

    validatedData.isDeleted = false;
    req.conditions = validatedData;
    done()
}

const validateDeleteDay = (req, res, done) => {
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
      return generalMiddleware.standardErrorResponse(res, errorArray, 'nonDeliveryDays.middleware.validateDeleteDay')
    }
    done()
}

module.exports = {
    validateAddDay,
    validateGetAlDays,
    validateDeleteDay
}