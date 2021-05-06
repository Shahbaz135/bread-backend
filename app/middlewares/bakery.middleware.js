'use strict'

const _ = require('lodash')
const generalMiddleware = require('./general.middleware')

///// validating get all categories by partner
const validateGetBakery = (req, res, done) => {
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
        return generalMiddleware.standardErrorResponse(res, errorArray, 'bakery.middleware.validateGetBakery')
    }

    validatedQuery.isDeleted = false;
    req.conditions = validatedQuery;
    done()
}

////// validating update category
const validateUpdateBakery = (req, res, done) => {
    const errorArray = []
    const body = req.body
    const validatedQuery = {}
  
    // name is an required  Validating as not empty, valid String and length range.
    if (body.hasOwnProperty('name') && body.name) {
      if (!_.isString(body.name)) {
          errorArray.push({
          field: 'name',
          error: 70000,
          message: 'Please provide only valid \'name\' as string'
          })
      }
      validatedQuery.name = body.name;
    }

    // email is an required  Validating as not empty, valid String and length range.
    if (body.hasOwnProperty('email') && body.email) {
      if (!_.isString(body.email)) {
          errorArray.push({
          field: 'email',
          error: 70000,
          message: 'Please provide only valid \'email\' as string'
          })
      }
      validatedQuery.email = body.email;
    }

    // phone is an required  Validating as not empty, valid String and length range.
    if (body.hasOwnProperty('phone') && body.phone) {
      if (_.isEmpty(body.phone)) {
          errorArray.push({
          field: 'phone',
          error: 70000,
          message: 'Please provide only valid \'phone\' as string'
          })
      }
      validatedQuery.phone = body.phone;
    }

    // mobileNumber is an required  Validating as not empty, valid String and length range.
    if (body.hasOwnProperty('mobileNumber') && body.mobileNumber) {
      if (_.isEmpty(body.mobileNumber)) {
          errorArray.push({
          field: 'mobileNumber',
          error: 70000,
          message: 'Please provide only valid \'mobileNumber\' as string'
          })
      }
      validatedQuery.mobileNumber = body.mobileNumber;
    }

    // fax is an required  Validating as not empty, valid String and length range.
    if (body.hasOwnProperty('fax') && body.fax) {
      if (_.isEmpty(body.fax)) {
          errorArray.push({
          field: 'fax',
          error: 70000,
          message: 'Please provide only valid \'fax\' as string'
          })
      }
      validatedQuery.fax = body.fax;
    }

    // houseStreetNumber is an required  Validating as not empty, valid String and length range.
    if (body.hasOwnProperty('houseStreetNumber') && body.houseStreetNumber) {
      if (_.isEmpty(body.houseStreetNumber)) {
          errorArray.push({
          field: 'houseStreetNumber',
          error: 70000,
          message: 'Please provide only valid \'houseStreetNumber\' as string'
          })
      }
      validatedQuery.houseStreetNumber = body.houseStreetNumber;
    }

    // town is an required  Validating as not empty, valid String and length range.
    if (body.hasOwnProperty('town') && body.town) {
      if (_.isEmpty(body.town)) {
          errorArray.push({
          field: 'town',
          error: 70000,
          message: 'Please provide only valid \'town\' as string'
          })
      }
      validatedQuery.town = body.town;
    }

     // postalCode is an required  Validating as not empty, valid String and length range.
    if (body.hasOwnProperty('postalCode') && body.postalCode) {
      if (_.isNaN(body.postalCode) ) {
          errorArray.push({
          field: 'postalCode',
          error: 70000,
          message: 'Please provide only valid \'name\' as number'
          })
      }
      validatedQuery.postalCode = body.postalCode;
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
        return generalMiddleware.standardErrorResponse(res, errorArray, 'bakery.middleware.validateUpdateBakery')
    }
  
    req.conditions = { 
        data: validatedQuery
    }
    done()
}

module.exports = {
    validateGetBakery,
    validateUpdateBakery
}