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
      // Validating as not empty, valid numeric value with range.
      if (isNaN(query.id)) {
        errorArray.push({
          field: 'id',
          error: 5005,
          message: 'Please provide only valid \'id\' as numeric.'
        })
      }
      validatedQuery.id = query.id
    }
  
    // // CategoryId is an optional numeric property, if it is given than validate it.
    // if (query.hasOwnProperty('CategoryId') && query.CategoryId) {
    //   // Validating as not empty, valid numeric value with range.
    //   if (isNaN(query.CategoryId)) {
    //     errorArray.push({
    //       field: 'CategoryId',
    //       error: 5010,
    //       message: 'Please provide only valid \'CategoryId\' as numeric.'
    //     })
    //   }
    //   validatedQuery.CategoryId = query.CategoryId
    // }
  
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
    if (body.hasOwnProperty('fName') && body.fName != ``) {
        // Validating as not empty, valid String and length range.
        if (_.isEmpty(body.fName) || !_.isString(body.fName) || body.fName.length < 2 || body.fName.length > 100) {
        errorArray.push({
            field: 'fName',
            error: 1133,
            message: 'Please provide only valid \'fName\' as string, length must be between 2 and 100.'
        })
        }
        validatedData.fName = body.fName
    }

    // last name is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('lName') && body.lName != ``) {
        // Validating as not empty, valid String and length range.
        if (_.isEmpty(body.lName) || !_.isString(body.lName) || body.lName.length < 2 || body.lName.length > 100) {
        errorArray.push({
            field: 'lName',
            error: 1133,
            message: 'Please provide only valid \'lName\' as string, length must be between 2 and 100.'
        })
        }
        validatedData.lName = body.lName
    }

    // salutation is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('salutation') && body.salutation != ``) {
        // Validating as not empty, valid String and length range.
        if (_.isEmpty(body.salutation) || !_.isString(body.salutation) ) {
        errorArray.push({
            field: 'salutation',
            error: 1133,
            message: 'Please provide only valid \'salutation\' as string'
        })
        }
        validatedData.salutation = body.salutation
    }

    // desiredDate is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('desiredDate') && body.desiredDate != ``) {
        // Validating as not empty, valid String and length range.
        if (_.isEmpty(body.desiredDate) || !_.isString(body.desiredDate) ) {
        errorArray.push({
            field: 'desiredDate',
            error: 1136,
            message: 'Please provide only valid \'desiredDate\' as string, '
        })
        }
        validatedData.desiredDate = body.desiredDate
    }

    // email is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('email') && body.email != ``) {
        // Validating as not empty, valid String and length range.
        if (_.isEmpty(body.email) || !_.isString(body.email) ) {
        errorArray.push({
            field: 'email',
            error: 1136,
            message: 'Please provide only valid \'email\' as string, length must be between 2 and 100.'
        })
        }
        validatedData.email = body.email
    }

    // phone is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('phone') && body.phone != ``) {
        // Validating as not empty, valid String and length range.
        if (_.isEmpty(body.phone) || !_.isString(body.phone) || body.phone.length < 10 || body.phone.length > 11) {
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
    if (body.hasOwnProperty('town') && body.town != ``) {
        // Validating as not empty, valid String and length range.
        if (_.isEmpty(body.town) || !_.isString(body.town)) {
        errorArray.push({
            field: 'town',
            error: 1133,
            message: 'Please provide only valid \'town\' as string'
        })
        }
        validatedData.town = body.town
    }

    // houseStreetNumber is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('houseStreetNumber') && body.houseStreetNumber != ``) {
        // Validating as not empty, valid String and length range.
        if (_.isEmpty(body.houseStreetNumber) || !_.isString(body.houseStreetNumber)) {
        errorArray.push({
            field: 'houseStreetNumber',
            error: 1133,
            message: 'Please provide only valid \'houseStreetNumber\' as string'
        })
        }
        validatedData.houseStreetNumber = body.houseStreetNumber
    }

    // company is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('company') && body.company != ``) {
        // Validating as not empty, valid String and length range.
        if (_.isEmpty(body.company) || !_.isString(body.company)) {
        errorArray.push({
            field: 'company',
            error: 1133,
            message: 'Please provide only valid \'company\' as string'
        })
        }
        validatedData.company = body.company
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
    let limit = 50
    let offset = 0
  
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
  
    // // CategoryId is an optional numeric property, if it is given than validate it.
    // if (query.hasOwnProperty('CategoryId') && query.CategoryId) {
    //   // Validating as not empty, valid numeric value with range.
    //   if (isNaN(query.CategoryId)) {
    //     errorArray.push({
    //       field: 'CategoryId',
    //       error: 5010,
    //       message: 'Please provide only valid \'CategoryId\' as numeric.'
    //     })
    //   }
    //   validatedQuery.CategoryId = query.CategoryId
    // }
  
    if (!_.isEmpty(errorArray)) {
      return generalMiddleware.standardErrorResponse(res, errorArray, 'customer.middleware.validateGetCustomers')
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



module.exports = {
    validateRegistration,
    validateLoginCredentials,
    validateGetCustomers,
    validateUpdateCustomer,
    validateGetCustomerById,
    validateChangePassword,
    validateCreateCustomer
}
