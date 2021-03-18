'use strict'

const _ = require('lodash')
const generalMiddleware = require('./general.middleware')


// validating add area
const validateAddDeliveryArea = (req, res, done) => {
    const body = req.body;
    // get all the errors in an array
    const errorArray = [];
  
  
    // description is an optional string property, if it is given than validate it.
    if (body['description'] || body['description'] != ``) {
    // Validating as not empty, valid String and length range.
      if (_.isEmpty(body.description) || !_.isString(body.description)) {
        errorArray.push({
          field: 'description',
          error: 5000,
          message: 'Please provide only valid \'description\' as string.'
        })
      }
    }
  
    //   
    if (_.isEmpty(body.postCode) || _.isNaN(body.postCode) ) {
      errorArray.push({
      field: 'postCode',
      error: 1015,
      message: '\'postCode\' is required as number.'
      })
    }
  

    // weekDayId Is required, validating as array
    // body.weekDaysId = JSON.parse(body.weekDaysId)
    if (!_.isArray(body.regularDaysId)) {
      errorArray.push({
      field: 'weekDaysId',
      error: 90220,
      message: '\'regularDaysId\' is required as Array .'
      })
    }

    if (!_.isArray(body.sampleDaysId)) {
        errorArray.push({
        field: 'weekDaysId',
        error: 90220,
        message: '\'sampleDaysId\' is required as Array .'
        })
      }
  
  
    // send array if error(s)
    if (errorArray.length) {
      return generalMiddleware.standardErrorResponse(
        res,
        errorArray,
        "deliveryArea.middleware.validateAddDeliveryArea"
      );
    }
  
    req.body = body;
    done();
};

const validateUpdateDeliveryArea = (req, res, done) => {
    const body = req.body;
    let id = req.params.id
    // get all the errors in an array
    const errorArray = [];
    const validatedData = {}
  
    // id is required, validating as not empty, valid numeric value with range.
  if (!id || isNaN(id)) {
    errorArray.push({
      field: 'id',
      error: 1132,
      message: '\'id\' is required as numeric in params.'
    })
  }
  
    // description is an optional string property, if it is given than validate it.
    if (body['description'] && body['description'] != ``) {
    // Validating as not empty, valid String and length range.
      if (_.isEmpty(body.description) || !_.isString(body.description)) {
        errorArray.push({
          field: 'description',
          error: 5000,
          message: 'Please provide only valid \'description\' as string.'
        })
      }
      validatedData.description = body.description;
    }

    // state is an optional string property, if it is given than validate it.
    if (body['state'] && body['state'] != ``) {
        // Validating as not empty, valid String and length range.
          if (_.isEmpty(body.state) || !_.isString(body.state)) {
            errorArray.push({
              field: 'state',
              error: 5000,
              message: 'Please provide only valid \'state\' as string.'
            })
          }
          validatedData.state = body.state;
        }
  
    //
    if (body[`postCade`] && body[`postCode`] != `` ) {
        if (_.isEmpty(body.postCode) || _.isNaN(body.postCode) ) {
            errorArray.push({
            field: 'postCode',
            error: 1015,
            message: '\'postCode\' is required as number.'
            })
        }
        validatedData.postCade = body.postCade;
    }
   
  

    // weekDayId Is required, validating as array
    // body.weekDaysId = JSON.parse(body.weekDaysId)
    if (body[`regularDaysId`] && body[`regularDaysId`] != ``) {
        if (!_.isArray(body.regularDaysId)) {
            errorArray.push({
            field: 'weekDaysId',
            error: 90220,
            message: '\'regularDaysId\' is required as Array .'
            })
        }
        validatedData.regularDaysId = body.regularDaysId;
    }
    

    if (body[`sampleDaysId`] && body[`sampleDaysId`] != `` ) {
        if (!_.isArray(body.sampleDaysId)) {
            errorArray.push({
            field: 'weekDaysId',
            error: 90220,
            message: '\'sampleDaysId\' is required as Array .'
            })
        }
        validatedData.sampleDaysId = body.sampleDaysId;
    }
  
  
    // send array if error(s)
    if (errorArray.length) {
      return generalMiddleware.standardErrorResponse(
        res,
        errorArray,
        "deliveryArea.middleware.validateRegistration"
      );
    }
  
    req.body = {
        data: validatedData,
        id: id
    }
    done();
};


module.exports = {
    validateAddDeliveryArea,
    validateUpdateDeliveryArea
}