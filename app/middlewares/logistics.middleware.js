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

module.exports = {
    validateGetOrderSupplier,
    validateGetDeliveryList
}