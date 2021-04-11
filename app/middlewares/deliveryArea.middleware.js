'use strict'

const _ = require('lodash')
const generalMiddleware = require('./general.middleware')


// validating add area
const validateAddDeliveryArea = (req, res, done) => {
    const body = req.body;
    // get all the errors in an array
    const errorArray = [];
    const validatedConditions = {};
  
  
    // description is an optional string property, if it is given than validate it.
    if (body['description'] && body['description'] != ``) {
    // Validating as not empty, valid String and length range.
      if (_.isEmpty(body.description) && !_.isString(body.description)) {
        errorArray.push({
          field: 'description',
          error: 5000,
          message: 'Please provide only valid \'description\' as string.'
        })
      }
      validatedConditions.description = body.description;
    }

    // regularReference is an optional string property, if it is given than validate it.
    if (body['regularReference'] && body['regularReference'] != ``) {
      // Validating as not empty, valid String and length range.
      if (_.isEmpty(body.regularReference) || !_.isString(body.regularReference)) {
        errorArray.push({
          field: 'regularReference',
          error: 5000,
          message: 'Please provide only valid \'regularReference\' as string.'
        })
      }
      validatedConditions.orderReferenceRegular = body.regularReference;
    }

      // trailInformation is an optional string property, if it is given than validate it.
    if (body['trailInformation'] && body['trailInformation'] != ``) {
      // Validating as not empty, valid String and length range.
      if (_.isEmpty(body.trailInformation) || !_.isString(body.trailInformation)) {
        errorArray.push({
          field: 'trailInformation',
          error: 5000,
          message: 'Please provide only valid \'trailInformation\' as string.'
        })
      }
      validatedConditions.orderReferenceTrail = body.trailInformation;
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
      validatedConditions.state = body.state;
    }
  
    //   
    if (_.isEmpty(body.postCode) && _.isNaN(body.postCode) ) {
      errorArray.push({
        field: 'postCode',
        error: 1015,
        message: '\'postCode\' is required as number.'
      })
    }
    validatedConditions.postCode = body.postCode;
  

    // weekDayId Is required, validating as array
    // body.weekDaysId = JSON.parse(body.weekDaysId)
    if (!_.isArray(body.regularDeliveryDays)) {
      errorArray.push({
        field: 'regularDeliveryDays',
        error: 90220,
        message: '\'regularDeliveryDays\' is required as Array .'
      })
    }
    validatedConditions.regularDaysId = body.regularDeliveryDays;
    

    if (!_.isArray(body.sampleDeliveryDays)) {
      errorArray.push({
        field: 'weekDaysId',
        error: 90220,
        message: '\'sampleDeliveryDays\' is required as Array .'
      })
    }
    validatedConditions.sampleDaysId = body.sampleDeliveryDays;
  
  
    // send array if error(s)
    if (errorArray.length) {
      return generalMiddleware.standardErrorResponse(
        res,
        errorArray,
        "deliveryArea.middleware.validateAddDeliveryArea"
      );
    }
  
    req.body = validatedConditions;
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
        message: '\'id\' is required as numeric in query.'
      })
    }
    
  
    // description is an optional string property, if it is given than validate it.
    if (body['description']) {
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

    // regularReference is an optional string property, if it is given than validate it.
    if (body['regularReference']) {
      // Validating as not empty, valid String and length range.
        if (_.isEmpty(body.regularReference) || !_.isString(body.regularReference)) {
          errorArray.push({
            field: 'regularReference',
            error: 5000,
            message: 'Please provide only valid \'regularReference\' as string.'
          })
        }
        validatedData.orderReferenceRegular = body.regularReference;
    }

      // trailInformation is an optional string property, if it is given than validate it.
    if (body['trailInformation']) {
      // Validating as not empty, valid String and length range.
        if (_.isEmpty(body.trailInformation) || !_.isString(body.trailInformation)) {
          errorArray.push({
            field: 'trailInformation',
            error: 5000,
            message: 'Please provide only valid \'trailInformation\' as string.'
          })
        }
        validatedData.orderReferenceTrail = body.trailInformation;
      }

    // state is an optional string property, if it is given than validate it.
    if (body['state'] ) {
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
    if (body[`postCode`]) {
      if (_.isEmpty(body.postCode) || _.isNaN(body.postCode) ) {
        errorArray.push({
          field: 'postCode',
          error: 1015,
          message: '\'postCode\' is required as number.'
        })
      }
      validatedData.postCode = body.postCode;
    }
   
  

    // weekDayId Is required, validating as array
    // body.weekDaysId = JSON.parse(body.weekDaysId)
    if (body[`regularDeliveryDays`] ) {
      if (!_.isArray(body.regularDeliveryDays)) {
        errorArray.push({
          field: 'weekDaysId',
          error: 90220,
          message: '\'regularDeliveryDays\' is required as Array .'
        })
      }
      validatedData.regularDaysId = body.regularDeliveryDays;
    }
    

    if (body[`sampleDeliveryDays`]) {
      if (!_.isArray(body.sampleDeliveryDays)) {
        errorArray.push({
          field: 'weekDaysId',
          error: 90220,
          message: '\'sampleDeliveryDays\' is required as Array .'
        })
      }
      validatedData.sampleDaysId = body.sampleDeliveryDays;
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

const validateGetDeliveryAreas = (req, res, done) => {
  const body = req.query;
  console.log(`body === `, body)
  // get all the errors in an array
  const errorArray = [];
  const validatedData = {}

  if (body['id'] && body['id'] != ``) {
    if (!body['id'] || isNaN(body['id'])) {
      errorArray.push({
        field: 'id',
        error: 1132,
        message: '\'id\' is required as numeric in query.'
      })
    }
    validatedData.id = body.id;
  }

  // send array if error(s)
  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(
      res,
      errorArray,
      "deliveryArea.middleware.validateGetDeliveryAreas"
    );
  }

  req.conditions = validatedData
  done();
}

const validateDeleteArea = (req, res, done) => {
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
    return generalMiddleware.standardErrorResponse(res, errorArray, 'user.middleware.validateDeleteProduct')
  }
  done()
}


module.exports = {
    validateAddDeliveryArea,
    validateUpdateDeliveryArea,
    validateGetDeliveryAreas,
    validateDeleteArea
}