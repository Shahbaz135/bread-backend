'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// registration validation
const validateRegistration = (req, res, done) => {
    const body = req.body
    // get all the errors in an array
    const errorArray = []
  
  
    //email is an required  Validating as not empty, valid String and length range.
    if (!_.isString(body.email) || body.email.length < 5 || body.email.length > 100 || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email))) {
        errorArray.push({
            field: 'email',
            error: 1006,
            message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
        })
    }
    
  
    // Name is required, validating it as not empty, valid String and length range.
    if (_.isEmpty(body.name) || !_.isString(body.name) || body.name.length < 2 || body.name.length > 100) {
      errorArray.push({
        field: 'name',
        error: 1000,
        message: '\'name\' is required as string, length must be between 2 and 100.'
      })
    }
  
     // password is required, validating it as not empty, valid String and length range.
     if (_.isEmpty(body.password) || !_.isString(body.password) || body.password.length < 8 || body.password.length > 16) {
      errorArray.push({
        field: 'password',
        error: 1015,
        message: '\'password\' is required as string, length must be between 8 and 16.'
      })
    }
  
  
    // confirm password is required, validating it as not empty, valid String and length range and equal to orignal password.
    if (_.isEmpty(body.confirmPassword) || !_.isString(body.confirmPassword) || body.confirmPassword.length < 8 || body.confirmPassword.length > 16 || body.password != body.confirmPassword) {
      errorArray.push({
        field: 'confirmPassword',
        error: 1015,
        message: '\'confirmPassword\' is not equal.'
      })
    }
  
  
     // phone is required, validating it as not empty, valid String and length range.
    if (_.isEmpty(body.phone) || !_.isString(body.phone) || body.phone.length < 11 || body.phone.length > 11) {
      errorArray.push({
        field: 'phone',
        error: 1009,
        message: '\'phone\' is required as string, length must be 11.'
      })
    }
  
    // landphone is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('landphone') && body.landphone != '') {
      // Validating as not empty, valid String and length range.
      if (_.isEmpty(body.landphone) || !_.isString(body.landphone) || body.landphone.length < 11 || body.landphone.length > 11) {
        errorArray.push({
          field: 'landphone',
          error: 1009,
          message: '\'landphone\' is required as string, length must be 11.'
        })
      }
    }

    // postal code is required, validating it as not empty, valid number
    if (_.isEmpty(body.postalCode) || !_.isString(body.postalCode) || !_.isNumber(body.postalCode) ) {
        errorArray.push({
          field: 'postalCode',
          error: 1009,
          message: '\'postalCode\' is required as number'
        })
    }

    // address is required, validating it as not empty, valid String.
    if (_.isEmpty(body.address) || !_.isString(body.address) ) {
        errorArray.push({
          field: 'address',
          error: 1009,
          message: '\'address\' is required as string, length must be 11.'
        })
    }

    // image is required, validating it as not empty, valid String.
    if (_.isEmpty(body.image) || !_.isString(body.image)) {
        errorArray.push({
          field: 'image',
          error: 1009,
          message: '\'image\' is required as string, length must be 11.'
        })
    }
  
    // send array if error(s)
    if (errorArray.length) {
      return generalMiddleware.standardErrorResponse(res, errorArray, 'partner.middleware.validateRegistration')
    }
  
    done()
}

module.exports = {
    validateRegistration
}