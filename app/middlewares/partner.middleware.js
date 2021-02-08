'use strict'

const _ = require('lodash')
const generalMiddleware = require('./general.middleware')


// registration validation
const validateRegistration = (req, res, done) => {
  const body = req.body
  // get all the errors in an array
  const errorArray = []

  if (!req.file) {
    errorArray.push({
      field: 'image',
      error: 1006,
      message: 'Please provide valid image. Only gif/png/jgp allowed'
    })
  }

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
  // if (_.isEmpty(body.confirmPassword) || !_.isString(body.confirmPassword) || body.confirmPassword.length < 8 || body.confirmPassword.length > 16 || body.password != body.confirmPassword) {
  //   errorArray.push({
  //     field: 'confirmPassword',
  //     error: 1015,
  //     message: '\'confirmPassword\' is not equal.'
  //   })
  // }


    // phone is required, validating it as not empty, valid String and length range.
  if (_.isEmpty(body.phone) || !_.isString(body.phone) || body.phone.length < 11 || body.phone.length > 11) {
    errorArray.push({
      field: 'phone',
      error: 1009,
      message: '\'phone\' is required as string, length must be 11.'
    })
  }

  // postal code is required, validating it as not empty, valid number
  if (!body.postalCode || _.isNaN(body.postalCode) ) {
    errorArray.push({
      field: 'postalCode',
      error: 1009,
      message: '\'postalCode\' is required as number'
    })
  }

  // House and Street number is required, validating it as not empty, valid String.
  if (_.isEmpty(body.houseStreetNumber) || !_.isString(body.houseStreetNumber) ) {
    errorArray.push({
      field: 'houseStreetNumber',
      error: 1009,
      message: '\'houseStreetNumber\' is required as string, length must be 11.'
    })
  }

  // Town is required, validating it as not empty, valid String.
  if (_.isEmpty(body.town) || !_.isString(body.town) ) {
    errorArray.push({
      field: 'town',
      error: 1009,
      message: '\'town\' is required as string, length must be 11.'
    })
  }

  // IBAN is required, validating it as not empty, valid String.
  if (_.isEmpty(body.iban) || !_.isString(body.iban) ) {
    errorArray.push({
      field: 'iban',
      error: 1009,
      message: '\'iban\' is required as string, length must be 11.'
    })
  }

  // image is required, validating it as not empty, valid String.
  // if (_.isEmpty(body.image) || !_.isString(body.image)) {
  //   errorArray.push({
  //     field: 'image',
  //     error: 1009,
  //     message: '\'image\' is required as string, length must be 11.'
  //   })
  // }

  // send array if error(s)
  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'partner.middleware.validateRegistration')
  }

  req.body = body;
  done()
}



const validateLoginCredentials = (req, res, done) => {
  const body = req.body
  // get all the errors in an array
  const errorArray = []

  // email is required, validating it as not empty, valid String and length range.
  if (_.isEmpty(body.email) || !_.isString(body.email) ) {
    errorArray.push({
      field: 'email',
      error: 10100,
      message: '\'email\' is required as string, length must be 11.'
    })
  }

  // password is required, validating it as not empty, valid String and length range.
  if (_.isEmpty(body.password) || !_.isString(body.password)) {
    errorArray.push({
      field: 'password',
      error: 10110,
      message: '\'password\' is required.'
    })
  }

  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'partner.middleware.validateLoginCredentials')
  }

  return done()
}

const validateGetPartnerByPostalCode = (req, res, done) => {
  const body = req.query
  // get all the errors in an array
  const errorArray = []
  const validatedConditions = {};

  // postalCode is required, validating it as not empty, valid String and length range.
  if (body.hasOwnProperty('postalCode') && body.postalCode != ``) {
    if (!body.postalCode || _.isNaN(body.postalCode) ) {
      errorArray.push({
        field: 'postalCode',
        error: 10100,
        message: '\'postalCode\' is required as number.'
      })
    }
    validatedConditions.postalCode = body.postalCode;
  }
  

  // id is optional, validating it as not empty, valid String and length range.
  if (body.hasOwnProperty('id') && body.id != ``) {
    if (!body.id || _.isNaN(body.id) ) {
      errorArray.push({
        field: 'id',
        error: 10100,
        message: '\'id\' is required as number.'
      })
    }
    validatedConditions.id = body.id
  }

  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'partner.middleware.validateGetPartnerByPostalCode')
  }

  req.conditions = validatedConditions;

  return done()
}

const validateGetAllPartners = (req, res, done) => {
  const body = req.query
  // get all the errors in an array
  const errorArray = []

  // // postalCode is required, validating it as not empty, valid String and length range.
  // if (_.isEmpty(body.postalCode) || !_.isString(body.postalCode) ) {
  //   errorArray.push({
  //     field: 'postalCode',
  //     error: 10100,
  //     message: '\'postalCode\' is required as string.'
  //   })
  // }

  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'partner.middleware.validateGetAllPartners')
  }

  return done()
}

module.exports = {
  validateRegistration,
  validateLoginCredentials,
  validateGetPartnerByPostalCode,
  validateGetAllPartners
}