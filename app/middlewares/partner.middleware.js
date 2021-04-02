'use strict'

const _ = require('lodash')
const generalMiddleware = require('./general.middleware')


// registration validation
const validateRegistration = (req, res, done) => {
  const body = req.body
  // get all the errors in an array
  const errorArray = []
  const validatedData = {};

  // if (!req.file) {
  //   errorArray.push({
  //     field: 'image',
  //     error: 1006,
  //     message: 'Please provide valid image. Only gif/png/jgp allowed'
  //   })
  // }

  //email is an required  Validating as not empty, valid String and length range.
  if (!_.isString(body.email) || body.email.length < 5 || body.email.length > 100 || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email))) {
    errorArray.push({
        field: 'email',
        error: 1006,
        message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
    })
  }

  validatedData.email = body.email;
  

  // Name is required, validating it as not empty, valid String and length range.
  if (_.isEmpty(body.name) || !_.isString(body.name) || body.name.length < 2 || body.name.length > 100) {
    errorArray.push({
      field: 'name',
      error: 1000,
      message: '\'name\' is required as string, length must be between 2 and 100.'
    })
  }
  validatedData.name = body.name;

  // password is required, validating it as not empty, valid String and length range.
  if (_.isEmpty(body.password) || !_.isString(body.password) || body.password.length < 8 || body.password.length > 16) {
    errorArray.push({
      field: 'password',
      error: 1015,
      message: '\'password\' is required as string, length must be between 8 and 16.'
    })
  }

  validatedData.password = body.password;

  // phone is required, validating it as not empty, valid String and length range.
  if (body.hasOwnProperty('phone') && body.phone != ``) {
    if (_.isEmpty(body.phone) || !_.isString(body.phone) || body.phone.length < 11 || body.phone.length > 11) {
      errorArray.push({
        field: 'phone',
        error: 1009,
        message: '\'phone\' is required as string, length must be 11.'
      })
    }
    validatedData.phone = body.phone;
  }

  // postal code is required, validating it as not empty, valid number
  if (!body.postalCode || _.isNaN(body.postalCode) ) {
    errorArray.push({
      field: 'postalCode',
      error: 1009,
      message: '\'postalCode\' is required as number'
    })
  }
  validatedData.postalCode = body.postalCode;

  // House and Street number is required, validating it as not empty, valid String.
  if (_.isEmpty(body.houseStreetNumber) || !_.isString(body.houseStreetNumber) ) {
    errorArray.push({
      field: 'houseStreetNumber',
      error: 1009,
      message: '\'houseStreetNumber\' is required as string, length must be 11.'
    })
  }
  validatedData.houseStreetNumber = body.houseStreetNumber;

  // Town is required, validating it as not empty, valid String.
  if (body.hasOwnProperty('town') && body.town != ``) {
    if (_.isEmpty(body.town) || !_.isString(body.town) ) {
      errorArray.push({
        field: 'town',
        error: 1009,
        message: '\'town\' is required as string'
      })
    }
    validatedData.town = body.town;
  }
  

  // IBAN is required, validating it as not empty, valid String.
  if (body.hasOwnProperty('iban') && body.iban != ``) {
    if (_.isEmpty(body.iban) || !_.isString(body.iban) ) {
      errorArray.push({
        field: 'iban',
        error: 1009,
        message: '\'iban\' is required as string, length must be 11.'
      })
    }
    validatedData.iban = body.iban;
  }

  // IBAN is required, validating it as not empty, valid String.
  if (body.hasOwnProperty('isIban')) {
    validatedData.isIban = body.isIban;
  }

  // IBAN is required, validating it as not empty, valid String.
  if (body.hasOwnProperty('isName')) {
    validatedData.isName = body.isName;
  }

  // IBAN is required, validating it as not empty, valid String.
  if (body.hasOwnProperty('isEmail')) {
    validatedData.isEmail = body.isEmail;
  }

  // IBAN is required, validating it as not empty, valid String.
  if (body.hasOwnProperty('isPassword')) {
    validatedData.isPassword = body.isPassword;
  }

  // IBAN is required, validating it as not empty, valid String.
  if (body.hasOwnProperty('isHouseStreetNumber')) {
    validatedData.isHouseStreetNumber = body.isHouseStreetNumber;
  }

  // IBAN is required, validating it as not empty, valid String.
  if (body.hasOwnProperty('isTown')) {
    validatedData.isTown = body.isTown;
  }

  // send array if error(s)
  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'partner.middleware.validateRegistration')
  }

  req.body = validatedData;
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

///// validating update order
const validateUpdatePartner = (req, res, done) => {
  const body = req.body
  let id = req.params.id

  // get all the errors in an array
  const errorArray = []
  const validatedConditions = {}


   // id is required, validating as not empty, valid numeric value with range.
  if (!id || isNaN(id)) {
      errorArray.push({
      field: 'id',
      error: 1132,
      message: '\'id\' is required as numeric in params.'
      })
  }


  // validFrom date is optional, validating it as not empty, valid number
  if (body.hasOwnProperty('name') && body.name != ``) {
      if (_.isEmpty(body.name) || !_.isString(body.name)) {
          errorArray.push({
          field: "name",
          error: 1009,
          message: "'name' is required as date",
          });
      }
      validatedConditions.name = body.name;
  }

  // expiry date is optional, validating it as not empty, valid number
  if (body.hasOwnProperty('email') && body.email != ``) {
      if (_.isEmpty(body.email) || !_.isString(body.email)) {
          errorArray.push({
          field: "email",
          error: 1009,
          message: "'email' is required as string",
          });
      }
      validatedConditions.email = body.email;
  }
  
  // is one time is optional, validating it as boolean
  if (body.hasOwnProperty('isName')) {
      if (!_.isBoolean(body.isName)) {
          errorArray.push({
          field: "isName",
          error: 1009,
          message: "'isName' is required as boolean",
          });
      }
      validatedConditions.isName = body.isName
  }

  // is trail is optional, validating it as boolean
  if (body.hasOwnProperty('isEmail')) {
      if (!_.isBoolean(body.isEmail)) {
          errorArray.push({
          field: "isEmail",
          error: 1009,
          message: "'isEmail' is required as boolean",
          });
      }
      validatedConditions.isEmail = body.isEmail
  }

  // is trail is optional, validating it as boolean
  if (body.hasOwnProperty('isPassword')) {
    if (!_.isBoolean(body.isPassword)) {
        errorArray.push({
        field: "isPassword",
        error: 1009,
        message: "'isPassword' is required as boolean",
        });
    }
    validatedConditions.isPassword = body.isPassword
  }

  // is trail is optional, validating it as boolean
  if (body.hasOwnProperty('isPostalCode')) {
    if (!_.isBoolean(body.isPostalCode)) {
        errorArray.push({
        field: "isPostalCode",
        error: 1009,
        message: "'isPostalCode' is required as boolean",
        });
    }
    validatedConditions.isPostalCode = body.isPostalCode
  }

   // is trail is optional, validating it as boolean
  if (body.hasOwnProperty('isHouseStreetNumber')) {
    if (!_.isBoolean(body.isHouseStreetNumber)) {
        errorArray.push({
        field: "isHouseStreetNumber",
        error: 1009,
        message: "'isHouseStreetNumber' is required as boolean",
        });
    }
    validatedConditions.isHouseStreetNumber = body.isHouseStreetNumber
  }

   // is trail is optional, validating it as boolean
  if (body.hasOwnProperty('isTown')) {
    if (!_.isBoolean(body.isTown)) {
        errorArray.push({
        field: "isTown",
        error: 1009,
        message: "'isTown' is required as boolean",
        });
    }
    validatedConditions.isTown = body.isTown
  }

   // is trail is optional, validating it as boolean
  if (body.hasOwnProperty('isIban')) {
    if (!_.isBoolean(body.isIban)) {
        errorArray.push({
        field: "isIban",
        error: 1009,
        message: "'isIban' is required as boolean",
        });
    }
    validatedConditions.isIban = body.isIban
  }

  // // status is optional, validating it as boolean
  // if (body.hasOwnProperty('password')) {
  //   if (!_.isString(body.password)) {
  //       errorArray.push({
  //       field: "password",
  //       error: 1009,
  //       message: "'password' is required as string",
  //       });
  //   }
  //   validatedConditions.password = body.password
  // }

  // status is optional, validating it as boolean
  if (body.hasOwnProperty('postalCode')) {
    if (!_.isString(body.postalCode)) {
        errorArray.push({
        field: "postalCode",
        error: 1009,
        message: "'postalCode' is required as string",
        });
    }
    validatedConditions.postalCode = body.postalCode
  }

  // status is optional, validating it as boolean
  if (body.hasOwnProperty('houseStreetNumber') &&  body.houseStreetNumber !== ``) {
    if (!_.isString(body.houseStreetNumber)) {
        errorArray.push({
        field: "houseStreetNumber",
        error: 1009,
        message: "'houseStreetNumber' is required as string",
        });
    }
    validatedConditions.houseStreetNumber = body.houseStreetNumber
  }

  // status is optional, validating it as boolean
  if (body.hasOwnProperty('town') &&  body.town !== ``) {
    if (!_.isString(body.town)) {
        errorArray.push({
        field: "town",
        error: 1009,
        message: "'town' is required as string",
        });
    }
    validatedConditions.town = body.town
  }

  // status is optional, validating it as boolean
  if (body.hasOwnProperty('iban') && body.iban !== `` && body.iban) {
    if (!_.isString(body.iban)) {
        errorArray.push({
        field: "iban",
        error: 1009,
        message: "'iban' is required as string",
        });
    }
    validatedConditions.iban = body.iban
  }

  // send array if error(s)
  if (errorArray.length) {
      return generalMiddleware.standardErrorResponse(res, errorArray, 'partner.middleware.validateUpdatePartner')
  }

  req.body = {
    data: validatedConditions,
    id: id
  }
  done()
}

module.exports = {
  validateRegistration,
  validateLoginCredentials,
  validateGetPartnerByPostalCode,
  validateGetAllPartners,
  validateUpdatePartner
}