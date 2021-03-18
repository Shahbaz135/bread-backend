'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')


// registration validation
const validateAddProduct = (req, res, done) => {
  const body = req.body;
  // get all the errors in an array
  const errorArray = [];

  //// checking product images and validating type
  if (!req.file) {
    errorArray.push({
      field: 'image',
      error: 1006,
      message: 'Please provide valid image. Only gif/png/jgp allowed'
    })
  }


  // Name is required, validating it as not empty, valid String and length range.
  if (_.isEmpty(body.name) || !_.isString(body.name) || body.name.length < 2 || body.name.length > 100) 
  {
    errorArray.push({
    field: "Name",
    error: 1000,
    message:
        "'name' is required as string, length must be between 2 and 100.",
    });
  }

  // designation is required, validating it as not empty, valid String and length range.
  if ( _.isEmpty(body.designation) || !_.isString(body.designation) ) 
  {
    errorArray.push({
    field: "Designation",
    error: 1000,
    message:
        "'designation' is required as string.",
    });
  }

  // shortDescription is required, validating it as not empty.
  if ( _.isEmpty(body.shortDescription) || !_.isString(body.shortDescription) ) 
  {
    errorArray.push({
    field: "shortDescription",
    error: 1015,
    message:
        "'shortDescription' is required as string.",
    });
  }

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

  //   product price is required, validating it as not empty, valid String 
  if (_.isEmpty(body.productPrice) || _.isNaN(body.productPrice) ) {
    errorArray.push({
    field: 'productPrice',
    error: 1015,
    message: '\'productPrice\' is required as string.'
    })
  }

  //   purchasing price is required, validating it as not empty, valid String 
  if (_.isEmpty(body.purchasingPrice) || _.isNaN(body.purchasingPrice) ) {
    errorArray.push({
    field: 'purchasingPrice',
    error: 1015,
    message: '\'purchasingPrice\' is required as string.'
    })
  }

  // label is an optional string property, if it is given than validate it.
  if (body['label'] || body['label'] != ``) {
    // Validating as not empty, valid String and length range.
    if (_.isNaN(body.label)) {
      errorArray.push({
        field: 'label',
        error: 5000,
        message: 'Please provide only valid \'label\' as number.'
      })
    }
  }

  // item is an optional string property, if it is given than validate it.
  if (body['item'] || body['item'] !=  ``) {
    // Validating as not empty, valid String and length range.
    if (_.isNaN(body.item)) {
      errorArray.push({
        field: 'item',
        error: 5000,
        message: 'Please provide only valid \'item\' as number.'
      })
    }
  }

  // vat rate is required, validating it as not empty, valid String 
  if (_.isEmpty(body.vatRate) || _.isNaN(body.vatRate) ) {
    errorArray.push({
    field: 'vatRate',
    error: 1015,
    message: '\'vatRate\' is required as number.'
    })
  }

  // order from is required, validating it as not empty, valid date
  if (_.isEmpty(body.orderFrom) || !_.isString(body.orderFrom) ) {
    errorArray.push({
    field: 'orderFrom',
    error: 1015,
    message: '\'orderFrom\' is required as date.'
    })
  }

  // weekDayId Is required, validating as array
  body.weekDaysId = JSON.parse(body.weekDaysId)
  if (!_.isArray(body.weekDaysId)) {
    errorArray.push({
    field: 'weekDaysId',
    error: 90220,
    message: '\'weekDaysId\' is required as Array .'
    })
  }

  // // availableDays is required, validating it as not empty
  // if (_.isEmpty(body.availableDays) || !_.isString(body.availableDays) ) {
  //   errorArray.push({
  //   field: 'availableDays',
  //   error: 1015,
  //   message: '\'availableDays\' is required as array.'
  //   })
  // }

  // is active is required, validating it as boolean
  if (_.isEmpty(body.isActive) || !_.isString(body.isActive)) {
    errorArray.push({
    field: 'isActive',
    error: 1015,
    message: '\'isActive\' is required as boolean.'
    })
  }


  // isTrailAvailable is required, validating it as boolean
  if (!_.isString(body.isTrailAvailable) || _.isEmpty(body.isTrailAvailable)) {
    errorArray.push({
    field: 'isTrailAvailable',
    error: 1015,
    message: '\'isTrailAvailable\' is required as boolean.'
    })
  }

  // isHideOnSupplierOrder is required, validating it as boolean
  if (!_.isString(body.isHideOnSupplierOrder) || _.isEmpty(body.isHideOnSupplierOrder)) {
    errorArray.push({
    field: 'isHideOnSupplierOrder',
    error: 1015,
    message: '\'isHideOnSupplierOrder\' is required as boolean.'
    })
  }

  // partner id is required, validating as not empty, valid numeric value with range.
  if (!body.partnerId || isNaN(body.partnerId)) {
      errorArray.push({
      field: 'partnerId',
      error: 90071,
      message: '\'partnerId\' is required as numeric.'
      })
  }
  body.PartnerId = body.partnerId
  
  // category id is required, validating as not empty, valid numeric value with range.
  if (!body.categoryId || isNaN(body.categoryId)) {
    errorArray.push({
    field: 'categoryId',
    error: 90071,
    message: '\'categoryId\' is required as numeric.'
    })
  }
  body.CategoryId = body.categoryId

  // send array if error(s)
  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(
      res,
      errorArray,
      "product.middleware.validateAddProduct"
    );
  }

  req.body = body;
  done();
};



// validate search product
const validateSearchProducts = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedQuery = {}
  let limit = 50
  let offset = 0

  // SupplierId is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('SupplierId') && query.SupplierId) {
    // Validating as not empty, valid numeric value with range.
    if (isNaN(query.SupplierId)) {
      errorArray.push({
        field: 'SupplierId',
        error: 5005,
        message: 'Please provide only valid \'SupplierId\' as numeric.'
      })
    }
    validatedQuery.SupplierId = query.SupplierId
  }

  // CategoryId is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('CategoryId') && query.CategoryId) {
    // Validating as not empty, valid numeric value with range.
    if (isNaN(query.CategoryId)) {
      errorArray.push({
        field: 'CategoryId',
        error: 5010,
        message: 'Please provide only valid \'CategoryId\' as numeric.'
      })
    }
    validatedQuery.CategoryId = query.CategoryId
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'user.middleware.validateSearchProducts')
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

// Update Product Validations
const validateUpdateProduct = (req, res, done) => {
  const errorArray = []
  const body = req.body
  let id = req.params.id
  const validatedData = {}

  if (req.user.role != 'Admin') {
    errorArray.push({
      field: 'id',
      error: 1131,
      message: 'You are not allowed to edit this record.'
    })
  }

  // id is required, validating as not empty, valid numeric value with range.
  if (!id || isNaN(id)) {
    errorArray.push({
      field: 'id',
      error: 1132,
      message: '\'id\' is required as numeric in params.'
    })
  }

  // name is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('name')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.name) || !_.isString(body.name) || body.name.length < 2 || body.name.length > 100) {
      errorArray.push({
        field: 'name',
        error: 1133,
        message: 'Please provide only valid \'name\' as string, length must be between 2 and 100.'
      })
    }
    validatedData.name = body.name
  }

  // nameUrdu is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('nameUrdu')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.nameUrdu) || !_.isString(body.nameUrdu) || body.nameUrdu.length < 2 || body.nameUrdu.length > 100) {
      errorArray.push({
        field: 'nameUrdu',
        error: 1133,
        message: 'Please provide only valid \'nameUrdu\' as string, length must be between 2 and 100.'
      })
    }
    validatedData.nameUrdu = body.nameUrdu
  }

  // unit is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('unit')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.unit) || !_.isString(body.unit) || body.unit.length < 2 || body.unit.length > 100) {
      errorArray.push({
        field: 'unit',
        error: 1136,
        message: 'Please provide only valid \'unit\' as string, length must be between 2 and 100.'
      })
    }
    validatedData.unit = body.unit
  }

  // unitUrdu is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('unitUrdu')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.unitUrdu) || !_.isString(body.unitUrdu) || body.unitUrdu.length < 2 || body.unitUrdu.length > 100) {
      errorArray.push({
        field: 'unitUrdu',
        error: 1136,
        message: 'Please provide only valid \'unitUrdu\' as string, length must be between 2 and 100.'
      })
    }
    validatedData.unitUrdu = body.unitUrdu
  }

  // isActive is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('isActive')) {
    // Validating as not empty, valid String and length range.
    if (!body.isActive || (body.isActive != 'true' && body.isActive != 'false')) {
      errorArray.push({
        field: 'isActive ',
        error: 1152,
        message: 'Please provide only valid \'isActive \' as boolean.'
      })
    }
    try {
      validatedData.isActive = JSON.parse(body.isActive)
    } catch (error) {
      console.error(error)
    }
  }

  // Send error Array if error(s).
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'user.middleware.validateUpdateProduct')
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

const validateDeleteProduct = (req, res, done) => {
  const errorArray = []
  const params = req.params

  if (req.user.role != 'Admin') {
    errorArray.push({
      field: 'id',
      error: 1131,
      message: 'You are not allowed to delete this record.'
    })
  }

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
  validateAddProduct,
  validateSearchProducts,
  validateUpdateProduct,
  validateDeleteProduct
}
