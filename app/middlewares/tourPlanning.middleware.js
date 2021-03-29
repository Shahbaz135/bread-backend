'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// create tour validation
const validateAddTour = (req, res, done) => {
    const body = req.body;

    // get all the errors in an array
    const errorArray = [];
    const validatedConditions = {}

  
    // description is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('description') && body.description != '') {
    // Validating as not empty, valid String and length range.
        if (_.isEmpty(body.description) || !_.isString(body.description)) {
            errorArray.push({
            field: 'description',
            error: 5000,
            message: 'Please provide only valid \'description\' as string.'
            })
        }
        validatedConditions.description = body.description
    }
  
    // label is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('label') && body.label != '') {
    // Validating as not empty, valid String and length range.
        if (_.isEmpty(body.label) || !_.isString(body.label)) {
            errorArray.push({
            field: 'label',
            error: 5000,
            message: 'Please provide only valid \'label\' as string.'
            })
        }
        validatedConditions.label = body.label
    }

    // name is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('name') && body.name != '') {
    // Validating as not empty, valid String and length range.
        if (_.isEmpty(body.name) || !_.isString(body.name)) {
            errorArray.push({
            field: 'name',
            error: 5000,
            message: 'Please provide only valid \'name\' as string.'
            })
        }
        validatedConditions.name = body.name
    }

    // billingMode is an optional string property, if it is given than validate it.
    if (body.hasOwnProperty('billingMode') && body.billingMode != '') {
    // Validating as not empty, valid String and length range.
        if (_.isEmpty(body.billingMode) || !_.isString(body.billingMode)) {
            errorArray.push({
            field: 'billingMode',
            error: 5000,
            message: 'Please provide only valid \'billingMode\' as string.'
            })
        }
        validatedConditions.billingMode = body.billingMode
    }

    // receptionTour is optional, validating it as boolean
    if (body.hasOwnProperty('receptionTour')) {
        if (!_.isBoolean(body.receptionTour)) {
            errorArray.push({
            field: "receptionTour",
            error: 1009,
            message: "'receptionTour' is required as boolean",
            });
        }
        validatedConditions.receptionTour = body.receptionTour
    }

    // supportTour is optional, validating it as boolean
    if (body.hasOwnProperty('supportTour')) {
        if (!_.isBoolean(body.supportTour)) {
            errorArray.push({
            field: "supportTour",
            error: 1009,
            message: "'supportTour' is required as boolean",
            });
        }
        validatedConditions.supportTour = body.supportTour
    }
    
  
    // partner id is optional, validating as not empty, valid numeric value with range.
    if (body.hasOwnProperty('partnerId') && body.partnerId != '') {
        if (!body.partnerId || isNaN(body.partnerId)) {
            errorArray.push({
            field: 'partnerId',
            error: 90071,
            message: '\'partnerId\' is required as numeric.'
            })
        }
        validatedConditions.PartnerId = body.partnerId
    }

    // user id id is optional, validating as not empty, valid numeric value with range.
    if (body.hasOwnProperty('userId') && body.userId != '') {
        if (!body.userId || isNaN(body.userId)) {
            errorArray.push({
            field: 'userId',
            error: 90071,
            message: '\'userId\' is required as numeric.'
            })
        }
        validatedConditions.UserId = body.userId
    }

    // user ids id is optional, validating as not empty, valid numeric value with range.
    if (body.hasOwnProperty('userIds') && body.userIds != '') {
        if (!_.isArray(body.weekDayIds)) {
            errorArray.push({
            field: 'userIds',
            error: 90071,
            message: '\'userIds\' is required as array.'
            })
        }
        validatedConditions.UserIds = body.userIds
    }

    // week days ids id is optional, validating as not empty, valid numeric value with range.
    if (body.hasOwnProperty('weekDayIds') && body.weekDayIds != '') {
        if (!_.isArray(body.weekDayIds)) {
            errorArray.push({
            field: 'weekDayIds',
            error: 90071,
            message: '\'weekDayIds\' is required as array.'
            })
        }
        validatedConditions.WeekDayIds = body.weekDayIds
    }
  
    // send array if error(s)
    if (errorArray.length) {
      return generalMiddleware.standardErrorResponse(
        res,
        errorArray,
        "tourPlanning.middleware.validateAddTour"
      );
    }
  
    req.body = validatedConditions;
    done();
};

//// get tour validation
const validateGetTours = (req, res, done) => {
    const errorArray = []
    const query = req.query
    const validatedQuery = {}
    let limit = 50
    let offset = 0


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

    // UserId is an optional numeric property, if it is given than validate it.
    if (query.hasOwnProperty('UserId') && query.UserId) {
        // Validating as not empty, valid numeric value with range.
        if (isNaN(query.UserId)) {
        errorArray.push({
            field: 'UserId',
            error: 5010,
            message: 'Please provide only valid \'UserId\' as numeric.'
        })
        }
        validatedQuery.UserId = query.UserId
    }

    // WeekDayIds is an optional numeric property, if it is given than validate it.
    if (query.hasOwnProperty('WeekDayIds')) {
        // Validating as not empty, valid numeric value with range.
        if (!_.isArray(body.weekDayIds)) {
        errorArray.push({
            field: 'WeekDayIds',
            error: 5010,
            message: 'Please provide only valid \'WeekDayIds\' as array.'
        })
        }
        validatedQuery.WeekDayIds = query.WeekDayIds
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
        return generalMiddleware.standardErrorResponse(res, errorArray, 'tourPlanning.middleware.validateGetTours')
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
    validateAddTour,
    validateGetTours
}

