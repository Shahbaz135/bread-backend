'use strict'

const _ = require('lodash')
const generalMiddleware = require('./general.middleware')

///// validating create order
const validateCreateOrder = (req, res, done) => {
    const body = req.body
    // get all the errors in an array
    const errorArray = []
    const validatedConditions = {}

    // customer Is required, validating as number
    if (!(body.customerId) || _.isNaN(body.customerId)) {
        errorArray.push({
        field: 'customerId',
        error: 90220,
        message: '\'customerId\' is required as Numeric .'
        })
    }

    // partnerId Is required, validating as number
    if (!(body.partnerId) || _.isNaN(body.partnerId)) {
        errorArray.push({
        field: 'partnerId',
        error: 90220,
        message: '\'partnerId\' is required as Numeric .'
        })
    }

    // valid from is required, validating it as not empty, valid date
    if (_.isEmpty(body.validFrom) || !_.isString(body.validFrom) ) {
        errorArray.push({
        field: 'validFrom',
        error: 1015,
        message: '\'validFrom\' is required as date.'
        })
    }

    // expiry date is optional, validating it as not empty, valid number
    if (body.hasOwnProperty('expiryDate') && body.expiryDate != ``) {
        if (_.isEmpty(body.expiryDate) || !_.isString(body.expiryDate)) {
            errorArray.push({
            field: "expiryDate",
            error: 1009,
            message: "'expiryDate' is required as string",
            });
        }
        validatedConditions.expiryDate = body.expiryDate;
    }

    // price Is required, validating as number
    if (!(body.overAllPrice) || _.isNaN(body.overAllPrice)) {
        errorArray.push({
        field: 'overAllPrice',
        error: 90220,
        message: '\'overAllPrice\' is required as Numeric .'
        })
    }

     // order Is required, validating as array
    if (!_.isArray(body.order)) {
        errorArray.push({
        field: 'order',
        error: 90220,
        message: '\'order\' is required as Array .'
        })
    }

    // is one time is optional, validating it as boolean
    if (body.hasOwnProperty('isOneTime')) {
        if (!_.isBoolean(body.isOneTime)) {
            errorArray.push({
            field: "isOneTime",
            error: 1009,
            message: "'isOneTime' is required as boolean",
            });
        }
        validatedConditions.isOneTime = body.isOneTime
    }

    // is trail is optional, validating it as boolean
    if (body.hasOwnProperty('isTrail')) {
        if (!_.isBoolean(body.isTrail)) {
            errorArray.push({
            field: "isTrail",
            error: 1009,
            message: "'isTrail' is required as boolean",
            });
        }
        validatedConditions.isTrail = body.isTrail
    }

    // is trail is optional, validating it as boolean
    if (body.hasOwnProperty('isAdditional')) {
        if (!_.isBoolean(body.isAdditional)) {
            errorArray.push({
            field: "isAdditional",
            error: 1009,
            message: "'isAdditional' is required as boolean",
            });
        }
        validatedConditions.isAdditional = body.isAdditional
    }

    // status is optional, validating it as boolean
    if (body.hasOwnProperty('status')) {
        if (!_.isString(body.status)) {
            errorArray.push({
            field: "status",
            error: 1009,
            message: "'status' is required as string",
            });
        }
        validatedConditions.status = body.status
    }

    // send array if error(s)
    if (errorArray.length) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'order.middleware.validateCreateOrder')
    }

    validatedConditions.CustomerId = body.customerId;
    validatedConditions.PartnerId = body.partnerId;
    validatedConditions.validFrom = body.validFrom;
    validatedConditions.overAllPrice = body.overAllPrice;
    validatedConditions.order = body.order;

    req.body = validatedConditions;
    done()
}

///// validating get order
const validateGetOrders = (req, res, done) => {
    const errorArray = []
    const query = req.query
    const validatedQuery = {}
    let limit = 50
    let offset = 0

     // Customer Id is an optional numeric property, if it is given than validate it.
    if (query.hasOwnProperty('CustomerId') && query.CustomerId) {
        // Validating as not empty, valid numeric value with range.
        if (isNaN(query.CustomerId)) {
        errorArray.push({
            field: 'CustomerId',
            error: 5005,
            message: 'Please provide only valid \'CustomerId\' as numeric.'
        })
        }
        validatedQuery.CustomerId = query.CustomerId
    }

    // PartnerId is an optional numeric property, if it is given than validate it.
    if (query.hasOwnProperty('PartnerId') && query.PartnerId) {
        // Validating as not empty, valid numeric value with range.
        if (isNaN(query.PartnerId)) {
        errorArray.push({
            field: 'PartnerId',
            error: 5010,
            message: 'Please provide only valid \'PartnerId\' as numeric.'
        })
        }
        validatedQuery.PartnerId = query.PartnerId
    }

    
    // isOne Time is an optional numeric property, if it is given than validate it.
    if (query.hasOwnProperty('isOneTime')) {
        query.isOneTime = JSON.parse(query.isOneTime);
        // Validating as not empty, valid numeric value with range.
        if (!_.isBoolean(query.isOneTime)) {
            errorArray.push({
                field: 'isOneTime',
                error: 5010,
                message: 'Please provide only valid \'isOneTime\' as boolean.'
            })
        }
        validatedQuery.isOneTime = query.isOneTime
    }

    // is trail is optional, validating it as boolean
    if (query.hasOwnProperty('isTrail')) {
        query.isTrail = JSON.parse(query.isTrail);
        if (!_.isBoolean(query.isTrail)) {
            errorArray.push({
            field: "isTrail",
            error: 1009,
            message: "'isTrail' is required as boolean",
            });
        }
        validatedQuery.isTrail = query.isTrail
    }

    // is active is optional, validating it as boolean
    if (query.hasOwnProperty('isActive')) {
        query.isActive = JSON.parse(query.isActive);
        if (!_.isBoolean(query.isActive)) {
            errorArray.push({
            field: "isActive",
            error: 1009,
            message: "'isActive' is required as boolean",
            });
        }
        validatedQuery.isActive = query.isActive
    }

    if (!_.isEmpty(errorArray)) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'order.middleware.validateGetOrders')
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

///// validating get order
const validateGetOrderById = (req, res, done) => {
    const errorArray = []
    const query = req.query
    const validatedQuery = {}

    // Id is an optional numeric property, if it is given than validate it.
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

    
    // isOne Time is an optional numeric property, if it is given than validate it.
    if (query.hasOwnProperty('isOneTime')) {
        query.isOneTime = JSON.parse(query.isOneTime);
        // Validating as not empty, valid numeric value with range.
        if (!_.isBoolean(query.isOneTime)) {
            errorArray.push({
                field: 'isOneTime',
                error: 5010,
                message: 'Please provide only valid \'isOneTime\' as boolean.'
            })
        }
        validatedQuery.isOneTime = query.isOneTime
    }

    // is trail is optional, validating it as boolean
    if (query.hasOwnProperty('isTrail')) {
        query.isTrail = JSON.parse(query.isTrail);
        if (!_.isBoolean(query.isTrail)) {
            errorArray.push({
            field: "isTrail",
            error: 1009,
            message: "'isTrail' is required as boolean",
            });
        }
        validatedQuery.isTrail = query.isTrail
    }

    // is active is optional, validating it as boolean
    if (query.hasOwnProperty('isActive')) {
        query.isActive = JSON.parse(query.isActive);
        if (!_.isBoolean(query.isActive)) {
            errorArray.push({
            field: "isActive",
            error: 1009,
            message: "'isActive' is required as boolean",
            });
        }
        validatedQuery.isActive = query.isActive
    }

    if (!_.isEmpty(errorArray)) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'order.middleware.validateGetOrderById')
    }


    req.conditions = validatedQuery
    done()
}

///// validating update order
const validateUpdateOrder = (req, res, done) => {
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
    if (body.hasOwnProperty('validFrom') && body.validFrom != ``) {
        if (_.isEmpty(body.validFrom) || !_.isString(body.validFrom)) {
            errorArray.push({
            field: "validFrom",
            error: 1009,
            message: "'validFrom' is required as date",
            });
        }
        validatedConditions.validFrom = body.validFrom;
    }

    // expiry date is optional, validating it as not empty, valid number
    if (body.hasOwnProperty('expiryDate') && body.expiryDate != ``) {
        if (_.isEmpty(body.expiryDate) || !_.isString(body.expiryDate)) {
            errorArray.push({
            field: "expiryDate",
            error: 1009,
            message: "'expiryDate' is required as string",
            });
        }
        validatedConditions.expiryDate = body.expiryDate;
    }

    // price Is optional, validating as number
    if (body.hasOwnProperty('overAllPrice') && body.overAllPrice) {
        if (!(body.overAllPrice) || _.isNaN(body.overAllPrice)) {
            errorArray.push({
            field: 'overAllPrice',
            error: 90220,
            message: '\'overAllPrice\' is required as Numeric .'
            })
        }
        validatedConditions.overAllPrice = body.overAllPrice;
    }
    

     // order Is required, validating as array
    if (!_.isArray(body.order)) {
        errorArray.push({
        field: 'order',
        error: 90220,
        message: '\'order\' is required as Array .'
        })
    }

    // is one time is optional, validating it as boolean
    if (body.hasOwnProperty('isOneTime')) {
        if (!_.isBoolean(body.isOneTime)) {
            errorArray.push({
            field: "isOneTime",
            error: 1009,
            message: "'isOneTime' is required as boolean",
            });
        }
        validatedConditions.isOneTime = body.isOneTime
    }

    // is trail is optional, validating it as boolean
    if (body.hasOwnProperty('isTrail')) {
        if (!_.isBoolean(body.isTrail)) {
            errorArray.push({
            field: "isTrail",
            error: 1009,
            message: "'isTrail' is required as boolean",
            });
        }
        validatedConditions.isTrail = body.isTrail
    }

    // status is optional, validating it as boolean
    if (body.hasOwnProperty('status')) {
        if (!_.isString(body.status)) {
            errorArray.push({
            field: "status",
            error: 1009,
            message: "'status' is required as string",
            });
        }
        validatedConditions.status = body.status
    }

    // send array if error(s)
    if (errorArray.length) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'order.middleware.validateUpdateOrder')
    }

    validatedConditions.order = body.order;
    req.body = {
        data: validatedConditions,
        id: id
    }
    done()
}

const validateDeleteOrder = (req, res, done) => {
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
      return generalMiddleware.standardErrorResponse(res, errorArray, 'order.middleware.validateDeleteOrder')
    }
    done()
}

module.exports = {
    validateCreateOrder,
    validateGetOrders,
    validateGetOrderById,
    validateUpdateOrder,
    validateDeleteOrder
}