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

    // send array if error(s)
    if (errorArray.length) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'category.middleware.validateAddCategory')
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

module.exports = {
    validateCreateOrder,
    validateGetOrders
}