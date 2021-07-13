'use strict'

const _ = require('lodash')
const generalMiddleware = require('./general.middleware')

///// validating get all categories by partner
const validateGetOrderSupplier = (req, res, done) => {
    const errorArray = []
    const query = req.query
    const validatedQuery = {}

    if (query.hasOwnProperty('fromDate')) {
        // if (!_.isString(body.name)) {
        //     errorArray.push({
        //     field: 'name',
        //     error: 70000,
        //     message: 'Please provide only valid \'name\' as string'
        //     })
        // }
        validatedQuery.fromDate = query.fromDate;
    }

    if (query.hasOwnProperty('toDate')) {
        // if (!_.isString(body.name)) {
        //     errorArray.push({
        //     field: 'name',
        //     error: 70000,
        //     message: 'Please provide only valid \'name\' as string'
        //     })
        // }
        validatedQuery.toDate = query.toDate;
    }

    // send array if error(s)
    if (errorArray.length) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'bakery.middleware.validateGetBakery')
    }

    // validatedQuery = query;
    validatedQuery.isDeleted = false;
    req.conditions = validatedQuery;
    done()
}

////// validating update category
const validateGetDeliveryList = (req, res, done) => {
    const errorArray = []
    const query = req.query
    const validatedQuery = {}
  
    if (!_.isEmpty(errorArray)) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'bakery.middleware.validateUpdateBakery')
    }
  
    req.conditions = { 
        data: validatedQuery
    }
    done()
}

///// validating get order
const validateGetPDF = (req, res, done) => {
    const errorArray = []
    const query = req.query
    const validatedQuery = {}

    // date is an optional numeric property, if it is given than validate it.
    if (query.hasOwnProperty('date') && query.date) {
        // Validating as not empty, valid numeric value with range.
        validatedQuery.date = query.date
    }

    // dayis an optional numeric property, if it is given than validate it.
     if (query.hasOwnProperty('day') && query.day) {
        // Validating as not empty, valid numeric value with range.
        if (query.day == 'Monday') {
            validatedQuery.day = 1
        } else if (query.day == 'Tuesday') {
            validatedQuery.day = 2
        } else if (query.day == 'Wednesday') {
            validatedQuery.day = 3
        } else if (query.day == 'Thursday') {
            validatedQuery.day = 4
        } else if (query.day == 'Friday') {
            validatedQuery.day = 5
        } else if (query.day == 'Saturday') {
            validatedQuery.day = 6
        } else if (query.day == 'Sunday') {
            validatedQuery.day = 7
        }
        
    }

    if (!_.isEmpty(errorArray)) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'logistics.middleware.validateGetPDF')
    }

    req.conditions = validatedQuery
    done()
}

module.exports = {
    validateGetOrderSupplier,
    validateGetDeliveryList,
    validateGetPDF
}