'use strict'

const _ = require('lodash')
const generalMiddleware = require('./general.middleware')

///// validating get all categories by partner
const validateGetBankDetails = (req, res, done) => {
    const errorArray = []
    const query = req.query
    const validatedQuery = {}


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
        return generalMiddleware.standardErrorResponse(res, errorArray, 'bankDetail.middleware.validateGetBankDetails')
    }

    validatedQuery.isDeleted = false;
    req.conditions = validatedQuery;
    done()
}

////// validating update category
const validateUpdateBankDetail = (req, res, done) => {
    const errorArray = []
    const body = req.body
    const validatedQuery = {}
  
    // iban is an required  Validating as not empty, valid String and length range.
    if (body.hasOwnProperty('iban') && body.iban) {
      if (!_.isString(body.iban)) {
          errorArray.push({
          field: 'iban',
          error: 70000,
          message: 'Please provide only valid \'iban\' as string'
          })
      }
      validatedQuery.iban = body.iban;
    }

    // bic is an required  Validating as not empty, valid String and length range.
    if (body.hasOwnProperty('bic') && body.bic) {
      if (!_.isString(body.bic)) {
          errorArray.push({
          field: 'bic',
          error: 70000,
          message: 'Please provide only valid \'bic\' as string'
          })
      }
      validatedQuery.bic = body.bic;
    }

    // creditorId is an required  Validating as not empty, valid String and length range.
    if (body.hasOwnProperty('creditorId') && body.creditorId) {
      if (_.isEmpty(body.creditorId)) {
          errorArray.push({
          field: 'creditorId',
          error: 70000,
          message: 'Please provide only valid \'creditorId\' as string'
          })
      }
      validatedQuery.creditorId = body.creditorId;
    }

    // usage is an required  Validating as not empty, valid String and length range.
    if (body.hasOwnProperty('usage') && body.usage) {
      if (_.isEmpty(body.usage)) {
          errorArray.push({
          field: 'usage',
          error: 70000,
          message: 'Please provide only valid \'usage\' as string'
          })
      }
      validatedQuery.usage = body.usage;
    }

    // accountType is an required  Validating as not empty, valid String and length range.
    if (body.hasOwnProperty('accountType') && body.accountType) {
      if (_.isEmpty(body.accountType)) {
          errorArray.push({
          field: 'accountType',
          error: 70000,
          message: 'Please provide only valid \'accountType\' as string'
          })
      }
      validatedQuery.accountType = body.accountType;
    }

    // userId Is required, validating as number
    if (body.hasOwnProperty('userId') && body.userId) {
        if (!(body.userId) || _.isNaN(body.userId)) {
          errorArray.push({
            field: 'userId',
            error: 90220,
            message: '\'userId\' is required as Numeric .'
          })
        }
        validatedQuery.UserId = body.userId
    }

  
    if (!_.isEmpty(errorArray)) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'bankDetail.middleware.validateUpdateBankDetail')
    }
  
    req.conditions = { 
        data: validatedQuery
    }
    done()
}

module.exports = {
    validateGetBankDetails,
    validateUpdateBankDetail
}