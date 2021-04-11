"use strict";

const _ = require("lodash");
const generalMiddleware = require("./general.middleware");

// registration validation
const validateRegistration = (req, res, done) => {
    const body = req.body;
    // get all the errors in an array
    const errorArray = [];


    //email is an required  Validating as not empty, valid String and length range.
    if (
        !_.isString(body.email) ||
        body.email.length < 5 ||
        body.email.length > 100 ||
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email)
    ) {
        errorArray.push({
        field: "email",
        error: 1006,
        message:
            "Please provide only valid 'email' as string, length must be between 5 and 100.",
        });
    }

    // salutation Name is required, validating it as not empty, valid String and length range.
    if (
        _.isEmpty(body.fName) ||
        !_.isString(body.fName) ||
        body.fName.length < 2 ||
        body.fName.length > 100
    ) {
        errorArray.push({
        field: "first name",
        error: 1000,
        message:
            "'first name' is required as string, length must be between 2 and 100.",
        });
    }

    // First Name is required, validating it as not empty, valid String and length range.
    if (
        _.isEmpty(body.salutation) ||
        !_.isString(body.salutation) ||
        body.salutation.length < 1 ||
        body.salutation.length > 10
    ) {
        errorArray.push({
        field: "salutation",
        error: 1000,
        message:
            "'salutation' is required as string, length must be between 2 and 10.",
        });
    }

    // Last Name is required, validating it as not empty, valid String and length range.
    if (
        _.isEmpty(body.lName) ||
        !_.isString(body.lName) ||
        body.lName.length < 2 ||
        body.lName.length > 100
    ) {
        errorArray.push({
        field: "last name",
        error: 1000,
        message:
            "'last name' is required as string, length must be between 2 and 100.",
        });
    }

    // password is required, validating it as not empty, valid String and length range.
    if (
        _.isEmpty(body.password) ||
        !_.isString(body.password) ||
        body.password.length < 8 ||
        body.password.length > 16
    ) {
        errorArray.push({
        field: "password",
        error: 1015,
        message:
            "'password' is required as string, length must be between 8 and 16.",
        });
    }

    //   confirm password is required, validating it as not empty, valid String and length range and equal to orignal password.
    if (_.isEmpty(body.confirmPassword) || !_.isString(body.confirmPassword) || body.confirmPassword.length < 8 || body.confirmPassword.length > 16 || body.password != body.confirmPassword) {
        errorArray.push({
        field: 'confirmPassword',
        error: 1015,
        message: '\'confirmPassword\' is not equal.'
        })
    }

    // phone is required, validating it as not empty, valid String and length range.
    if (
        _.isEmpty(body.phone) ||
        !_.isString(body.phone) ||
        body.phone.length < 11 ||
        body.phone.length > 11
    ) {
        errorArray.push({
        field: "phone",
        error: 1009,
        message: "'phone' is required as string, length must be 11.",
        });
    }

    // postal code is optional, validating it as not empty, valid number
    if (body.hasOwnProperty('postalCode') && body.postalCode != ``) {
        if (_.isEmpty(body.postalCode) || !_.isString(body.postalCode)) {
            errorArray.push({
            field: "postalCode",
            error: 1009,
            message: "'postalCode' is required",
            });
        }
    }
    

    // House and Street number is required, validating it as not empty, valid String.
    if (
        _.isEmpty(body.houseStreetNumber) ||
        !_.isString(body.houseStreetNumber)
    ) {
        errorArray.push({
        field: "houseStreetNumber",
        error: 1009,
        message: "'houseStreetNumber' is required as string, length must be 11.",
        });
    }

    // Town is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('town') && body.town != ``) {
        if (_.isEmpty(body.town) || !_.isString(body.town)) {
            errorArray.push({
            field: "town",
            error: 1009,
            message: "'town' is required as string, length must be 11.",
            });
        }
    }


    // IBAN is optional if given, validating it as not empty, valid String.
    if (body.hasOwnProperty('iban') && body.iban != ``) {
        if (_.isEmpty(body.iban) || !_.isString(body.iban)) {
            errorArray.push({
            field: "iban",
            error: 1009,
            message: "'iban' is required as string",
            });
        }
    }

    // company is optional if given, validating it as not empty, valid String.
    if (body.hasOwnProperty('company') && body.company != ``) {
        if (_.isEmpty(body.company) || !_.isString(body.company)) {
            errorArray.push({
            field: "company",
            error: 1009,
            message: "'company' is required as string",
            });
        }
    }

    // birthday is optional if given, validating it as not empty, valid String.
    if (body.hasOwnProperty('birthDay')) {
        if (_.isEmpty(body.birthDay) ) {
            errorArray.push({
            field: "birthDay",
            error: 1009,
            message: "'birthDay' is required as string",
            });
        }
    }

    // delivery notes is optional if given, validating it as not empty, valid String.
    if (body.hasOwnProperty('deliverNotes') && body.deliverNotes != ``) {
        if (_.isEmpty(body.deliverNotes) || !_.isString(body.deliverNotes)) {
            errorArray.push({
            field: "deliverNotes",
            error: 1009,
            message: "'deliverNotes' is required as string",
            });
        }
    }

    // recommendation of  is optional if given, validating it as not empty, valid String.
    if (body.hasOwnProperty('recommendationOf') && body.recommendationOf != ``) {
        if (_.isEmpty(body.recommendationOf) || !_.isString(body.recommendationOf)) {
            errorArray.push({
            field: "recommendationOf",
            error: 1009,
            message: "'recommendationOf' is required as string",
            });
        }
    }

    // desired date  is optional if given, validating it as not empty, valid Date.
    if (body.hasOwnProperty('desiredDate')) {
        if (_.isEmpty(body.desiredDate) || !_.isString(body.desiredDate)) {
            errorArray.push({
            field: "desiredDate",
            error: 1009,
            message: "'desiredDate' is required as date",
            });
        }
    }

    // partner id is required, validating as not empty, valid numeric value with range.
    if (!body.partnerId || isNaN(body.partnerId)) {
        errorArray.push({
        field: 'partnerId',
        error: 90071,
        message: '\'partnerId\' is required as numeric.'
        })
    }
    

  // send array if error(s)
  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(
      res,
      errorArray,
      "customer.middleware.validateRegistration"
    );
  }

  req.body = body;
  done();
};

//// when customer created ny admin
const validateCreateCustomer = (req, res, done) => {
    const body = req.body;
    // get all the errors in an array
    const errorArray = [];


    //email is an required  Validating as not empty, valid String and length range.
    if (
        !_.isString(body.email) ||
        body.email.length < 5 ||
        body.email.length > 100 ||
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email)
    ) {
        errorArray.push({
        field: "email",
        error: 1006,
        message:
            "Please provide only valid 'email' as string, length must be between 5 and 100.",
        });
    }

    // salutation Name is required, validating it as not empty, valid String and length range.
    if (
        _.isEmpty(body.fName) ||
        !_.isString(body.fName) ||
        body.fName.length < 2 ||
        body.fName.length > 100
    ) {
        errorArray.push({
        field: "first name",
        error: 1000,
        message:
            "'first name' is required as string, length must be between 2 and 100.",
        });
    }

    // Salutation is optional, validating it as not empty, valid String and length range.
    if (body.hasOwnProperty('salutation') && body.salutation != ``) {
        if (
            _.isEmpty(body.salutation) ||
            !_.isString(body.salutation) ||
            body.salutation.length < 1 ||
            body.salutation.length > 10
        ) {
            errorArray.push({
            field: "salutation",
            error: 1000,
            message:
                "'salutation' is required as string, length must be between 2 and 10.",
            });
        }
    }

    // Last Name is required, validating it as not empty, valid String and length range.
    if (
        _.isEmpty(body.lName) ||
        !_.isString(body.lName) ||
        body.lName.length < 2 ||
        body.lName.length > 100
    ) {
        errorArray.push({
        field: "last name",
        error: 1000,
        message:
            "'last name' is required as string, length must be between 2 and 100.",
        });
    }

    // phone is required, validating it as not empty, valid String and length range.
    if (
        _.isEmpty(body.phone) ||
        !_.isString(body.phone) ||
        body.phone.length < 11 ||
        body.phone.length > 11
    ) {
        errorArray.push({
        field: "phone",
        error: 1009,
        message: "'phone' is required as string, length must be 11.",
        });
    }

    // postal code is optional, validating it as not empty, valid number
    if (body.hasOwnProperty('postalCode') && body.postalCode != ``) {
        if (_.isEmpty(body.postalCode) || !_.isString(body.postalCode)) {
            errorArray.push({
            field: "postalCode",
            error: 1009,
            message: "'postalCode' is required",
            });
        }
    }
    

    // House and Street number is required, validating it as not empty, valid String.
    if (
        _.isEmpty(body.houseStreetNumber) ||
        !_.isString(body.houseStreetNumber)
    ) {
        errorArray.push({
        field: "houseStreetNumber",
        error: 1009,
        message: "'houseStreetNumber' is required as string, length must be 11.",
        });
    }

    // Town is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('town') && body.town != ``) {
        if (_.isEmpty(body.town) || !_.isString(body.town)) {
            errorArray.push({
            field: "town",
            error: 1009,
            message: "'town' is required as string, length must be 11.",
            });
        }
    }


    // IBAN is optional if given, validating it as not empty, valid String.
    if (body.hasOwnProperty('iban') && body.iban) {
        if (_.isEmpty(body.iban) || !_.isString(body.iban)) {
            errorArray.push({
            field: "iban",
            error: 1009,
            message: "'iban' is required as string",
            });
        }
    }

    // company is optional if given, validating it as not empty, valid String.
    if (body.hasOwnProperty('company') && body.company) {
        if (_.isEmpty(body.company) || !_.isString(body.company)) {
            errorArray.push({
            field: "company",
            error: 1009,
            message: "'company' is required as string",
            });
        }
    }

    // delivery notes is optional if given, validating it as not empty, valid String.
    if (body.hasOwnProperty('deliverNotes') && body.deliverNotes) {
        if (_.isEmpty(body.deliverNotes) || !_.isString(body.deliverNotes)) {
            errorArray.push({
            field: "deliverNotes",
            error: 1009,
            message: "'deliverNotes' is required as string",
            });
        }
    }

    // partner id is required, validating as not empty, valid numeric value with range.
    if (body.hasOwnProperty('partnerId') && body.partnerId) {
        if (!body.partnerId || isNaN(body.partnerId)) {
            errorArray.push({
            field: 'partnerId',
            error: 90071,
            message: '\'partnerId\' is required as numeric.'
            })
        }
    }
    

  // send array if error(s)
  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(
      res,
      errorArray,
      "customer.middleware.validateCreateCustomer"
    );
  }

  req.body = body;
  done();
}

///// validating login credentials
const validateLoginCredentials = (req, res, done) => {
    const body = req.body
    // get all the errors in an array
    const errorArray = []
  
    // phone is required, validating it as not empty, valid String and length range.
    if (_.isEmpty(body.phone) || !_.isString(body.phone) ) {
      errorArray.push({
        field: 'phone',
        error: 10100,
        message: '\'phone\' is required as string, length must be 11.'
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
      return generalMiddleware.standardErrorResponse(res, errorArray, 'customer.middleware.validateLoginCredentials')
    }
  
    return done()
}

// validate search product
const validateGetCustomers = (req, res, done) => {
    const errorArray = []
    const query = req.query
    const validatedQuery = {}
    let limit = 50
    let offset = 0
  
    // id is an optional numeric property, if it is given than validate it.
    if (query.hasOwnProperty('id') && query.id) {
      if (isNaN(query.id)) {
        errorArray.push({
          field: 'id',
          error: 5005,
          message: 'Please provide only valid \'id\' as numeric.'
        })
      }
      validatedQuery.id = query.id
    }

    // isTrail is an optional boolean property, if it is given than validate it.
    if (query.hasOwnProperty('isTrail')) {
        query.isTrail = JSON.parse(query.isTrail);
        if (!_.isBoolean(query.isTrail)) {
          errorArray.push({
            field: 'isTrail',
            error: 5005,
            message: 'Please provide only valid \'isTrail\' as boolean.'
          })
        }
        validatedQuery.isTrail = query.isTrail
    }

    // isWeb is an optional boolean property, if it is given than validate it.
    if (query.hasOwnProperty('isWeb')) {
        query.isWeb = JSON.parse(query.isWeb);
        if (!_.isBoolean(query.isWeb)) {
          errorArray.push({
            field: 'isWeb',
            error: 5005,
            message: 'Please provide only valid \'isWeb\' as boolean.'
          })
        }
        validatedQuery.isWeb = query.isWeb
    }

    // isArchive is an optional boolean property, if it is given than validate it.
    if (query.hasOwnProperty('isArchive')) {
        query.isArchive = JSON.parse(query.isArchive);
        if (!_.isBoolean(query.isArchive)) {
          errorArray.push({
            field: 'isArchive',
            error: 5005,
            message: 'Please provide only valid \'isArchive\' as boolean.'
          })
        }
        validatedQuery.isArchive = query.isArchive
    }

    // id is an optional numeric property, if it is given than validate it.
    if (query.hasOwnProperty('PartnerId') && query.PartnerId) {
        // Validating as not empty, valid numeric value with range.
        if (isNaN(query.PartnerId)) {
          errorArray.push({
            field: 'PartnerId',
            error: 5005,
            message: 'Please provide only valid \'PartnerId\' as numeric.'
          })
        }
        validatedQuery.PartnerId = query.PartnerId
    }

    // id is an optional  property, if it is given than validate it.
    if (query.hasOwnProperty('tourWeekDays') && query.tourWeekDays) {
        if (isNaN(query.tourWeekDays)) {
          errorArray.push({
            field: 'tourWeekDays',
            error: 5005,
            message: 'Please provide only valid \'tourWeekDays\' as numeric.'
          })
        }
        validatedQuery.tourWeekDays = query.tourWeekDays
    }

    // id is an optional  property, if it is given than validate it.
    if (query.hasOwnProperty('tourSaturday') && query.tourSaturday) {
        if (isNaN(query.tourSaturday)) {
          errorArray.push({
            field: 'tourSaturday',
            error: 5005,
            message: 'Please provide only valid \'tourSaturday\' as numeric.'
          })
        }
        validatedQuery.tourSaturday = query.tourSaturday
    }

    // id is an optional  property, if it is given than validate it.
    if (query.hasOwnProperty('tourSunday') && query.tourSunday) {
        if (isNaN(query.tourSunday)) {
          errorArray.push({
            field: 'tourSunday',
            error: 5005,
            message: 'Please provide only valid \'tourSunday\' as numeric.'
          })
        }
        validatedQuery.tourSunday = query.tourSunday
    }

    // fName is an optional  property, if it is given than validate it.
    if (query.hasOwnProperty('fName') && query.fName) {
        if (_.isEmpty(query.fName) || !_.isString(query.fName)) {
          errorArray.push({
            field: 'fName',
            error: 5005,
            message: 'Please provide only valid \'fName\' as string.'
          })
        }
        validatedQuery.fName = query.fName
    }

    // lName is an optional  property, if it is given than validate it.
    if (query.hasOwnProperty('lName') && query.lName) {
        if (_.isEmpty(query.lName) || !_.isString(query.lName)) {
          errorArray.push({
            field: 'lName',
            error: 5005,
            message: 'Please provide only valid \'lName\' as string.'
          })
        }
        validatedQuery.lName = query.lName
    }

    // houseStreetNumber is an optional  property, if it is given than validate it.
    if (query.hasOwnProperty('houseStreetNumber') && query.houseStreetNumber) {
        if (_.isEmpty(query.houseStreetNumber) || !_.isString(query.houseStreetNumber)) {
          errorArray.push({
            field: 'houseStreetNumber',
            error: 5005,
            message: 'Please provide only valid \'houseStreetNumber\' as string.'
          })
        }
        validatedQuery.houseStreetNumber = query.houseStreetNumber
    }

    // postalCode is an optional  property, if it is given than validate it.
    if (query.hasOwnProperty('postalCode') && query.postalCode) {
        if (_.isEmpty(query.postalCode) || !_.isString(query.postalCode)) {
          errorArray.push({
            field: 'postalCode',
            error: 5005,
            message: 'Please provide only valid \'postalCode\' as string.'
          })
        }
        validatedQuery.postalCode = query.postalCode
    }

    // town is an optional  property, if it is given than validate it.
    if (query.hasOwnProperty('town') && query.town) {
        if (_.isEmpty(query.town) || !_.isString(query.town)) {
          errorArray.push({
            field: 'town',
            error: 5005,
            message: 'Please provide only valid \'town\' as string.'
          })
        }
        validatedQuery.town = query.town
    }

    // email is an optional  property, if it is given than validate it.
    if (query.hasOwnProperty('email') && query.email) {
        if (_.isEmpty(query.email) || !_.isString(query.email)) {
          errorArray.push({
            field: 'email',
            error: 5005,
            message: 'Please provide only valid \'email\' as string.'
          })
        }
        validatedQuery.email = query.email
    }

    // phone is an optional  property, if it is given than validate it.
    if (query.hasOwnProperty('phone') && query.phone) {
        if (_.isEmpty(query.phone) || !_.isString(query.phone)) {
          errorArray.push({
            field: 'phone',
            error: 5005,
            message: 'Please provide only valid \'phone\' as string.'
          })
        }
        validatedQuery.phone = query.phone
    }

    // code is an optional  property, if it is given than validate it.
    if (query.hasOwnProperty('code') && query.code) {
        if (_.isEmpty(query.code) || !_.isString(query.code)) {
          errorArray.push({
            field: 'code',
            error: 5005,
            message: 'Please provide only valid \'code\' as string.'
          })
        }
        validatedQuery.code = query.code
    }
  
    if (!_.isEmpty(errorArray)) {
      return generalMiddleware.standardErrorResponse(res, errorArray, 'customer.middleware.validateGetCustomerById')
    }
  
    if (query.limit && query.limit > 0) {
      limit = query.limit
    }
  
    if (query.offset && query.offset > 0) {
      offset = query.offset
    }
  
    req.conditions = validatedQuery
    req.limit = limit
    req.offset = offset
    done()
}

///// update customer 
const validateUpdateCustomer = (req, res, done) => {
    const errorArray = []
    const body = req.body
    let id = req.params.id
    const validatedData = {}

    // id is required, validating as not empty, valid numeric value with range.
    if (!id || isNaN(id)) {
        errorArray.push({
        field: 'id',
        error: 1132,
        message: '\'id\' is required as numeric in params.'
        })
    }

    // first name is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('fName') && body.fName ) {
        // Validating as not empty, valid String and length range.
        if ( !_.isString(body.fName) || body.fName.length < 2 || body.fName.length > 100) {
        errorArray.push({
            field: 'fName',
            error: 1133,
            message: 'Please provide only valid \'fName\' as string, length must be between 2 and 100.'
        })
        }
        validatedData.fName = body.fName
    }

    // last name is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('lName') && body.lName) {
        // Validating as not empty, valid String and length range.
        if ( !_.isString(body.lName) || body.lName.length < 2 || body.lName.length > 100) {
        errorArray.push({
            field: 'lName',
            error: 1133,
            message: 'Please provide only valid \'lName\' as string, length must be between 2 and 100.'
        })
        }
        validatedData.lName = body.lName
    }

    // salutation is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('salutation') && body.salutation) {
        // Validating as not empty, valid String and length range.
        if (!_.isString(body.salutation) ) {
        errorArray.push({
            field: 'salutation',
            error: 1133,
            message: 'Please provide only valid \'salutation\' as string'
        })
        }
        validatedData.salutation = body.salutation
    }

    // academicTitle is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('academicTitle') && body.academicTitle) {
        // Validating as not empty, valid String and length range.
        if (!_.isString(body.academicTitle) ) {
        errorArray.push({
            field: 'academicTitle',
            error: 1133,
            message: 'Please provide only valid \'academicTitle\' as string'
        })
        }
        validatedData.academicTitle = body.academicTitle
    }

    // desiredDate is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('desiredDate') ) {
        // Validating as not empty, valid String and length range.
        if (!_.isString(body.desiredDate) ) {
        errorArray.push({
            field: 'desiredDate',
            error: 1136,
            message: 'Please provide only valid \'desiredDate\' as string, '
        })
        }
        validatedData.desiredDate = body.desiredDate
    }

    // email is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('email') && body.email) {
        // Validating as not empty, valid String and length range.
        if ( !_.isString(body.email) ) {
        errorArray.push({
            field: 'email',
            error: 1136,
            message: 'Please provide only valid \'email\' as string, length must be between 2 and 100.'
        })
        }
        validatedData.email = body.email
    }

    // phone is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('phone')) {
        // Validating as not empty, valid String and length range.
        if ( !_.isString(body.phone) || body.phone.length < 10 || body.phone.length > 11) {
        errorArray.push({
            field: 'phone',
            error: 1133,
            message: 'Please provide only valid \'phone\' as string, length must be between 10 and 11.'
        })
        }
        validatedData.phone = body.phone
    }

    // postal code is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('postalCode') && body.postalCode) {
        // Validating as not empty, valid String and length range.
        if (_.isNaN(body.postalCode)) {
        errorArray.push({
            field: 'postalCode',
            error: 1133,
            message: 'Please provide only valid \'postalCode\' as number'
        })
        }
        validatedData.postalCode = body.postalCode
    }

    // town is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('town') && body.town ) {
        // Validating as not empty, valid String and length range.
        if ( !_.isString(body.town)) {
        errorArray.push({
            field: 'town',
            error: 1133,
            message: 'Please provide only valid \'town\' as string'
        })
        }
        validatedData.town = body.town
    }

    // houseStreetNumber is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('houseStreetNumber') && body.houseStreetNumber) {
        // Validating as not empty, valid String and length range.
        if (!_.isString(body.houseStreetNumber)) {
        errorArray.push({
            field: 'houseStreetNumber',
            error: 1133,
            message: 'Please provide only valid \'houseStreetNumber\' as string'
        })
        }
        validatedData.houseStreetNumber = body.houseStreetNumber
    }

    // company is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('company') && body.company ) {
        // Validating as not empty, valid String and length range.
        if ( !_.isString(body.company)) {
        errorArray.push({
            field: 'company',
            error: 1133,
            message: 'Please provide only valid \'company\' as string'
        })
        }
        validatedData.company = body.company
    }

     // companyFName is an optional string property, if it is given than validate it.
     if (body.hasOwnProperty('companyFName') && body.companyFName) {
        // Validating as not empty, valid String and length range.
        if ( !_.isString(body.companyFName)) {
        errorArray.push({
            field: 'companyFName',
            error: 1133,
            message: 'Please provide only valid \'companyFName\' as string'
        })
        }
        validatedData.companyFName = body.companyFName
    }

     // companyLName is an optional string property, if it is given than validate it.
     if (body.hasOwnProperty('companyLName') && body.companyLName) {
        // Validating as not empty, valid String and length range.
        if ( !_.isString(body.companyLName)) {
        errorArray.push({
            field: 'companyLName',
            error: 1133,
            message: 'Please provide only valid \'companyLName\' as string'
        })
        }
        validatedData.companyLName = body.companyLName
    }

     // companyPostal is an optional string property, if it is given than validate it.
     if (body.hasOwnProperty('companyPostal') && body.companyPostal) {
        // Validating as not empty, valid String and length range.
        if (_.isNaN(body.companyPostal)) {
        errorArray.push({
            field: 'companyPostal',
            error: 1133,
            message: 'Please provide only valid \'companyPostal\' as string'
        })
        }
        validatedData.companyPostal = body.companyPostal
    }

     // companyPlace is an optional string property, if it is given than validate it.
     if (body.hasOwnProperty('companyPlace') && body.companyPlace) {
        // Validating as not empty, valid String and length range.
        if ( !_.isString(body.companyPlace)) {
        errorArray.push({
            field: 'companyPlace',
            error: 1133,
            message: 'Please provide only valid \'companyPlace\' as string'
        })
        }
        validatedData.companyPlace = body.companyPlace
    }

    // companyHouseStreetNumber is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('companyHouseStreetNumber') && body.companyHouseStreetNumber) {
        // Validating as not empty, valid String and length range.
        if (!_.isString(body.companyHouseStreetNumber)) {
        errorArray.push({
            field: 'companyHouseStreetNumber',
            error: 1133,
            message: 'Please provide only valid \'companyHouseStreetNumber\' as string'
        })
        }
        validatedData.companyHouseStreetNumber = body.companyHouseStreetNumber
    }

    // telePhone is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('telePhone') && body.telePhone ) {
        // Validating as not empty, valid String and length range.
        if ( !_.isString(body.telePhone)) {
            errorArray.push({
                field: 'telePhone',
                error: 1133,
                message: 'Please provide only valid \'telePhone\' as string'
            })
        }
        validatedData.telePhone = body.telePhone
    }

    // telePhone2 is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('telePhone2') && body.telePhone2 ) {
        // Validating as not empty, valid String and length range.
        if ( !_.isString(body.telePhone2)) {
            errorArray.push({
                field: 'telePhone2',
                error: 1133,
                message: 'Please provide only valid \'telePhone2\' as string'
            })
        }
        validatedData.telePhone2 = body.telePhone2
    }

    // fax is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('fax') && body.fax) {
        // Validating as not empty, valid String and length range.
        if ( !_.isString(body.fax)) {
            errorArray.push({
                field: 'fax',
                error: 1133,
                message: 'Please provide only valid \'fax\' as string'
            })
        }
        validatedData.fax = body.fax
    }

    // bankAccountOwner is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('bankAccountOwner') && body.bankAccountOwner) {
        // Validating as not empty, valid String and length range.
        if ( !_.isString(body.bankAccountOwner)) {
            errorArray.push({
                field: 'bankAccountOwner',
                error: 1133,
                message: 'Please provide only valid \'bankAccountOwner\' as string'
            })
        }
        validatedData.bankAccountOwner = body.bankAccountOwner
    }

    // iban is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('iban') && body.iban) {
        // Validating as not empty, valid String and length range.
        if ( !_.isString(body.iban)) {
            errorArray.push({
                field: 'iban',
                error: 1133,
                message: 'Please provide only valid \'iban\' as string'
            })
        }
        validatedData.iban = body.iban
    }

    // code is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('code') && body.code ) {
        // Validating as not empty, valid String and length range.
        if ( !_.isString(body.code)) {
            errorArray.push({
                field: 'code',
                error: 1133,
                message: 'Please provide only valid \'code\' as string'
            })
        }
        validatedData.code = body.code
    }

    // tourWeekDays is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('tourWeekDays')) {
        // Validating as not empty, valid String and length range.
        if (_.isNaN(body.tourWeekDays)) {
            errorArray.push({
                field: 'tourWeekDays',
                error: 1133,
                message: 'Please provide only valid \'tourWeekDays\' as string'
            })
        }
        validatedData.tourWeekDays = body.tourWeekDays
    }

    // tourSaturday is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('tourSaturday')) {
        // Validating as not empty, valid String and length range.
        if (_.isNaN(body.tourSaturday)) {
            errorArray.push({
                field: 'tourSaturday',
                error: 1133,
                message: 'Please provide only valid \'tourSaturday\' as string'
            })
        }
        validatedData.tourSaturday = body.tourSaturday
    }

    // tourSunday is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('tourSunday')) {
        // Validating as not empty, valid String and length range.
        if (_.isNaN(body.tourSunday)) {
            errorArray.push({
                field: 'tourSunday',
                error: 1133,
                message: 'Please provide only valid \'tourSunday\' as string'
            })
        }
        validatedData.tourSunday = body.tourSunday
    }

    // sortingWeekDays is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('sortingWeekDays') && body.sortingWeekDays) {
        // Validating as not empty, valid String and length range.
        if (_.isNaN(body.sortingWeekDays)) {
            errorArray.push({
                field: 'sortingWeekDays',
                error: 1133,
                message: 'Please provide only valid \'sortingWeekDays\' as string'
            })
        }
        validatedData.sortingWeekDays = body.sortingWeekDays
    }

    // sortingSaturday is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('sortingSaturday') && body.sortingSaturday ) {
        // Validating as not empty, valid String and length range.
        if ( _.isNaN(body.sortingSaturday)) {
            errorArray.push({
                field: 'sortingSaturday',
                error: 1133,
                message: 'Please provide only valid \'sortingSaturday\' as string'
            })
        }
        validatedData.sortingSaturday = body.sortingSaturday
    }

    // sortingSunday is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('sortingSunday') && body.sortingSunday ) {
        // Validating as not empty, valid String and length range.
        if ( _.isNaN(body.sortingSunday)) {
            errorArray.push({
                field: 'sortingSunday',
                error: 1133,
                message: 'Please provide only valid \'sortingSunday\' as string'
            })
        }
        validatedData.sortingSunday = body.sortingSunday
    }

    // discountHeight is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('discountHeight') && body.discountHeight ) {
        // Validating as not empty, valid String and length range.
        if ( !_.isString(body.discountHeight)) {
            errorArray.push({
                field: 'discountHeight',
                error: 1133,
                message: 'Please provide only valid \'discountHeight\' as string'
            })
        }
        validatedData.discountHeight = body.discountHeight
    }

    // discountReason is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('discountReason') && body.discountReason ) {
        // Validating as not empty, valid String and length range.
        if ( !_.isString(body.discountReason)) {
            errorArray.push({
                field: 'discountReason',
                error: 1133,
                message: 'Please provide only valid \'discountReason\' as string'
            })
        }
        validatedData.discountReason = body.discountReason
    }

    // isDifferentDeliveryFee is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('isDifferentDeliveryFee')) {
        // Validating as not empty, valid String and length range.
        // if (!_.isBoolean(body.isDifferentDeliveryFee)) {
        //     errorArray.push({
        //         field: 'isDifferentDeliveryFee',
        //         error: 1133,
        //         message: 'Please provide only valid \'isDifferentDeliveryFee\' as boolean'
        //     })
        // }
        validatedData.isDifferentDeliveryFee = body.isDifferentDeliveryFee
    }

    // feeWorkingDays is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('feeWorkingDays') && body.feeWorkingDays ) {
        // Validating as not empty, valid String and length range.
        if ( _.isNaN(body.feeWorkingDays)) {
            errorArray.push({
                field: 'feeWorkingDays',
                error: 1133,
                message: 'Please provide only valid \'feeWorkingDays\' as string'
            })
        }
        validatedData.feeWorkingDays = body.feeWorkingDays
    }

    // feeSaturday is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('feeSaturday') && body.feeSaturday ) {
        // Validating as not empty, valid String and length range.
        if ( _.isNaN(body.feeSaturday)) {
            errorArray.push({
                field: 'feeSaturday',
                error: 1133,
                message: 'Please provide only valid \'feeSaturday\' as string'
            })
        }
        validatedData.feeSaturday = body.feeSaturday
    }

    // feeSunday is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('feeSunday') && body.feeSunday) {
        // Validating as not empty, valid String and length range.
        if ( _.isNaN(body.feeSunday)) {
            errorArray.push({
                field: 'feeSunday',
                error: 1133,
                message: 'Please provide only valid \'feeSunday\' as string'
            })
        }
        validatedData.feeSunday = body.feeSunday
    }

    // paymentType is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('paymentType') && body.paymentType ) {
        // Validating as not empty, valid String and length range.
        if ( !_.isString(body.paymentType)) {
            errorArray.push({
                field: 'paymentType',
                error: 1133,
                message: 'Please provide only valid \'paymentType\' as string'
            })
        }
        validatedData.paymentType = body.paymentType
    }

    // sendInvoiceByEmail is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('sendInvoiceByEmail')) {
        // Validating as not empty, valid String and length range.
        // if ( !_.isBoolean(body.sendInvoiceByEmail)) {
        //     errorArray.push({
        //         field: 'sendInvoiceByEmail',
        //         error: 1133,
        //         message: 'Please provide only valid \'sendInvoiceByEmail\' as boolean'
        //     })
        // }
        validatedData.sendInvoiceByEmail = body.sendInvoiceByEmail
    }

    // isDiscountActivated is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('isDiscountActivated')) {
        // Validating as not empty, valid String and length range.
        // if ( !_.isBoolean(body.isDiscountActivated)) {
        //     errorArray.push({
        //         field: 'isDiscountActivated',
        //         error: 1133,
        //         message: 'Please provide only valid \'isDiscountActivated\' as string'
        //     })
        // }
        validatedData.isDiscountActivated = body.isDiscountActivated
    }

    // partnerId is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('partnerId') && body.partnerId) {
        // Validating as not empty, valid String and length range.
        if (_.isNaN(body.partnerId)) {
            errorArray.push({
                field: 'partnerId',
                error: 1133,
                message: 'Please provide only valid \'partnerId\' as number'
            })
        }
        validatedData.partnerId = body.partnerId
    }

    // isActive is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('isActive')) {
        // Validating as not empty, valid String and length range.
        if (!_.isBoolean(body.isActive)) {
            errorArray.push({
                field: 'isActive',
                error: 1133,
                message: 'Please provide only valid \'isActive\' as string'
            })
        }
        validatedData.isActive = body.isActive
    }

    // isArchive is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('isArchive')) {
        // Validating as not empty, valid String and length range.
        if (!_.isBoolean(body.isArchive)) {
            errorArray.push({
                field: 'isArchive',
                error: 1133,
                message: 'Please provide only valid \'isArchive\' as boolean'
            })
        }
        validatedData.isArchive = body.isArchive
    }

    // isTrail is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('isTrail')) {
        // Validating as not empty, valid String and length range.
        if (!_.isBoolean(body.isTrail)) {
            errorArray.push({
                field: 'isTrail',
                error: 1133,
                message: 'Please provide only valid \'isTrail\' as boolean'
            })
        }
        validatedData.isTrail = body.isTrail
    }

    // birthDay is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('birthDay') && body.birthDay) {
        // Validating as not empty, valid String and length range.
        if (!_.isDate) {
        errorArray.push({
            field: 'birthDay',
            error: 1133,
            message: 'Please provide only valid \'birthDay\' as date'
        })
        }
        validatedData.birthDay = body.birthDay
    }

    // partyInHouse is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('partyInHouse') && body.partyInHouse) {
        // Validating as not empty, valid String and length range.
        if (!_.isString) {
        errorArray.push({
            field: 'partyInHouse',
            error: 1133,
            message: 'Please provide only valid \'partyInHouse\' as string'
        })
        }
        validatedData.partyInHouse = body.partyInHouse
    }

    // deliverNotes is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('deliverNotes') && body.deliverNotes) {
        // Validating as not empty, valid String and length range.
        if (!_.isString) {
        errorArray.push({
            field: 'deliverNotes',
            error: 1133,
            message: 'Please provide only valid \'deliverNotes\' as string'
        })
        }
        validatedData.deliverNotes = body.deliverNotes
    }

    // Send error Array if error(s).
    if (!_.isEmpty(errorArray)) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'customer.middleware.validateUpdateCustomer')
    }

    if (_.isEmpty(validatedData)) {
        return generalMiddleware.standardErrorResponse(res, [{
        field: 'general',
        error: 1154,
        message: 'No data provided to update.'
        }], 'user.middleware.validateUpdateProduct')
    }

  req.body = {
    data: validatedData,
    id: id
  }
  return done()
}

///// get customers by id
const validateGetCustomerById = (req, res, done) => {
    const errorArray = []
    const query = req.query
    const validatedQuery = {}
  
    // id is an optional numeric property, if it is given than validate it.
  
    // Validating as not empty, valid numeric value with range.
    if (!query.id || isNaN(query.id)) {
    errorArray.push({
        field: 'id',
        error: 5005,
        message: 'Please provide only valid \'id\' as numeric.'
    })
    }
    validatedQuery.id = query.id

  
    if (!_.isEmpty(errorArray)) {
      return generalMiddleware.standardErrorResponse(res, errorArray, 'customer.middleware.validateGetCustomerById')
    }
  
    req.conditions = validatedQuery
    done()
}

///// for change password by customers
///// get customers by id
const validateChangePassword = (req, res, done) => {
    const errorArray = []
    const body = req.body
    const validatedCondition = {}

  
    // id is a numeric property, if it is given than validate it.
  
    // Validating as not empty, valid numeric value with range.
    if (!body.id || isNaN(body.id)) {
    errorArray.push({
        field: 'id',
        error: 5005,
        message: 'Please provide only valid \'id\' as numeric.'
    })
    }
    validatedCondition.id = body.id
  
    // password is required, if it is given than validate it.
      // Validating as not empty, valid numeric value with range.
      if (_.isEmpty(body.password || !_.isString(body.password))) {
        errorArray.push({
          field: 'password',
          error: 5010,
          message: 'Please provide only valid \'password\' as string.'
        })
      }
      validatedCondition.password = body.password
  
    if (!_.isEmpty(errorArray)) {
      return generalMiddleware.standardErrorResponse(res, errorArray, 'customer.middleware.validateChangePassword')
    }
  
    req.conditions = validatedCondition

    done()

}

const validateDeleteCustomer = (req, res, done) => {
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
      return generalMiddleware.standardErrorResponse(res, errorArray, 'customer.middleware.validateDeleteCustomer')
    }
    done()
}



module.exports = {
    validateRegistration,
    validateLoginCredentials,
    validateGetCustomers,
    validateUpdateCustomer,
    validateGetCustomerById,
    validateChangePassword,
    validateCreateCustomer,
    validateDeleteCustomer
}
