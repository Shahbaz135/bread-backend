'use strict'

const { isEmpty } = require('lodash')
const _ = require('lodash')
const generalMiddleware = require('./general.middleware')

///// validating create order
const validateCreate = (req, res, done) => {
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

    // send array if error(s)
    if (errorArray.length) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'invoice.middleware.validateCreate')
    }

    validatedConditions.CustomerId = body.customerId;
    validatedConditions.PartnerId = body.partnerId;
    validatedConditions.OrderId = body.orderId;
    validatedConditions.amount = body.amount;

    req.body = validatedConditions;
    done()
}

///// validating get order
const validateGet = (req, res, done) => {
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

    // OrderId is an optional numeric property, if it is given than validate it.
    if (query.hasOwnProperty('OrderId') && query.OrderId) {
        // Validating as not empty, valid numeric value with range.
        if (isNaN(query.OrderId)) {
        errorArray.push({
            field: 'OrderId',
            error: 5010,
            message: 'Please provide only valid \'OrderId\' as numeric.'
        })
        }
        validatedQuery.OrderId = query.OrderId
    }

    // status is an optional numeric property, if it is given than validate it.
    if (query.hasOwnProperty('status') && query.status) {
        // Validating as not empty, valid numeric value with range.
        if (isEmpty(query.status)) {
        errorArray.push({
            field: 'status',
            error: 5010,
            message: 'Please provide only valid \'status\' as string.'
        })
        }
        validatedQuery.status = query.status
    }


    if (!_.isEmpty(errorArray)) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'invoice.middleware.validateGet')
    }

    if (query.limit && query.limit > 0) {
        limit = query.limit
    }

    if (query.offset && query.offset > 0) {
        offset = query.offset
    }

    req.conditions = validatedQuery
    // req.limit = limit
    // req.offset = offset
    done()
}

///// validating get order
const validateGetPDF = (req, res, done) => {
    const errorArray = []
    const query = req.query
    const validatedQuery = {}

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

    // id is an optional numeric property, if it is given than validate it.
    if (query.hasOwnProperty('id') && query.id) {
        // Validating as not empty, valid numeric value with range.
        if (isNaN(query.id)) {
        errorArray.push({
            field: 'id',
            error: 5010,
            message: 'Please provide only valid \'id\' as numeric.'
        })
        }
        validatedQuery.id = query.id
    }


    if (!_.isEmpty(errorArray)) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'invoice.middleware.validateGetPDF')
    }

    req.conditions = validatedQuery
    done()
}

///// update invoice
const validateUpdateInvoice = (req, res, done) => {
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

    // status is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('status') && body.status ) {
        // Validating as not empty, valid String and length range.
        if ( !_.isString(body.status)) {
        errorArray.push({
            field: 'status',
            error: 1133,
            message: 'Please provide only valid \'status\' as string,.'
        })
        }
        validatedData.status = body.status
    }

    // Send error Array if error(s).
    if (!_.isEmpty(errorArray)) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'invoice.middleware.validateUpdateInvoice')
    }

    if (_.isEmpty(validatedData)) {
        return generalMiddleware.standardErrorResponse(res, [{
        field: 'general',
        error: 1154,
        message: 'No data provided to update.'
        }], 'invoice.middleware.validateUpdateInvoice')
    }

  req.body = {
    data: validatedData,
    id: id
  }
  return done()
}

module.exports = {
    validateCreate,
    validateGet,
    validateGetPDF,
    validateUpdateInvoice
}