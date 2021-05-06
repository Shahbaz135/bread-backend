'use strict'

const _ = require('lodash')
const generalMiddleware = require('./general.middleware')

///// validating get all categories by partner
const validateGetAllCharge = (req, res, done) => {
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

    // userId Is required, validating as number
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

    // // postCode Is required, validating as number
    // if (query.hasOwnProperty('postCode') && query.postCode) {
    //   if (!(query.postCode) || _.isNaN(query.postCode)) {
    //     errorArray.push({
    //       field: 'postCode',
    //       error: 90220,
    //       message: '\'postCode\' is required as Numeric .'
    //     })
    //   }
    //   validatedQuery.postCode = query.postCode
    // }
    

    // send array if error(s)
    if (errorArray.length) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'deliveryCharge.middleware.validateGetAllCharge')
    }

    validatedQuery.isDeleted = false;
    req.conditions = validatedQuery;
    done()
}

////// validating update category
const validateUpdateCharge = (req, res, done) => {
    const errorArray = []
    const body = req.body
    const validatedQuery = {}
  
    // workingDays is an required  Validating as not empty, valid String and length range.
    if (body.hasOwnProperty('workingDays') && body.workingDays) {
        if (_.isNaN(body.workingDays) ) {
            errorArray.push({
            field: 'workingDays',
            error: 70000,
            message: 'Please provide only valid \'name\' as number'
            })
        }
        validatedQuery.workingDays = body.workingDays;
    }

    // saturday is an required  Validating as not empty, valid String and length range.
    if (body.hasOwnProperty('saturday') && body.saturday) {
        if (_.isNaN(body.saturday) ) {
            errorArray.push({
            field: 'saturday',
            error: 70000,
            message: 'Please provide only valid \'name\' as number'
            })
        }
        validatedQuery.saturday = body.saturday;
    }

     // sunday is an required  Validating as not empty, valid String and length range.
    if (body.hasOwnProperty('sunday') && body.sunday) {
        if (_.isNaN(body.sunday) ) {
            errorArray.push({
            field: 'sunday',
            error: 70000,
            message: 'Please provide only valid \'name\' as number'
            })
        }
        validatedQuery.sunday = body.sunday;
    }

    // userId Is required, validating as number
    // if (query.hasOwnProperty('userId') && query.userId) {
        if (!(body.userId) || _.isNaN(body.userId)) {
          errorArray.push({
            field: 'userId',
            error: 90220,
            message: '\'userId\' is required as Numeric .'
          })
        }
        validatedQuery.UserId = body.userId
    // }

  
    if (!_.isEmpty(errorArray)) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'deliveryCharge.middleware.validateUpdateCharge')
    }
  
    req.conditions = { 
        data: validatedQuery
    }
    done()
}

module.exports = {
    validateGetAllCharge,
    validateUpdateCharge
}