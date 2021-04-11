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
  if (body['articleNo'] || body['articleNo'] !=  ``) {
    // Validating as not empty, valid String and length range.
    if (_.isNaN(body.articleNo)) {
      errorArray.push({
        field: 'articleNo',
        error: 5000,
        message: 'Please provide only valid \'articleNo\' as number.'
      })
    }
  }

  // vat rate is required, validating it as not empty, valid String 
  if (body['vatRate'] || body['vatRate'] !=  ``) {
    if (_.isEmpty(body.vatRate) || _.isNaN(body.vatRate) ) {
      errorArray.push({
      field: 'vatRate',
      error: 1015,
      message: '\'vatRate\' is required as number.'
      })
    }
  }

  // order from is required, validating it as not empty, valid date
  if (body['orderForm'] || body['orderForm'] !=  ``) {
    if (_.isEmpty(body.orderForm) || !_.isString(body.orderForm) ) {
      errorArray.push({
      field: 'orderForm',
      error: 1015,
      message: '\'orderForm\' is required as date.'
      })
    }
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
  if (body['partnerId'] && body['partnerId'] !=  ``) {
    if (!body.partnerId || isNaN(body.partnerId)) {
      errorArray.push({
      field: 'partnerId',
      error: 90071,
      message: '\'partnerId\' is required as numeric.'
      })
    }
    body.PartnerId = body.partnerId
  }
 
  
  // category id is required, validating as not empty, valid numeric value with range.
  if (!body.categoryId || isNaN(body.categoryId)) {
    errorArray.push({
    field: 'categoryId',
    error: 90071,
    message: '\'categoryId\' is required as numeric.'
    })
  }
  body.CategoryId = body.categoryId

  // partner id is required, validating as not empty, valid numeric value with range.
  if (body['userId'] && body['userId'] !=  ``) {
    if (!body.userId || isNaN(body.userId)) {
      errorArray.push({
      field: 'userId',
      error: 90071,
      message: '\'userId\' is required as numeric.'
      })
    }
    body.UserId = body.userId
  }

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

  // PartnerId is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('PartnerId') && query.PartnerId) {
    // Validating as not empty, valid numeric value with range.
    if (isNaN(query.PartnerId)) {
      errorArray.push({
        field: 'PartnerId',
        error: 5005,
        message: 'Please provide only valid \'PartnerId\' as numeric.'
      })
    }
    validatedQuery.PartnerId = query.PartnerId
  }

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

  // UserId is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('UserId') && query.UserId) {
    // Validating as not empty, valid numeric value with range.
    if (isNaN(query.UserId)) {
      errorArray.push({
        field: 'UserId',
        error: 5005,
        message: 'Please provide only valid \'UserId\' as numeric.'
      })
    }
    validatedQuery.UserId = query.UserId
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

  // isActive is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('isActive')) {
    query.isActive = JSON.parse(query.isActive);
    // Validating as not empty, valid numeric value with range.
    if (!_.isBoolean(query.isActive)) {
      errorArray.push({
        field: 'isActive',
        error: 5010,
        message: 'Please provide only valid \'isActive\' as boolean.'
      })
    }
    validatedQuery.isActive = query.isActive
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

  // if (req.user.role != 'Admin') {
  //   errorArray.push({
  //     field: 'id',
  //     error: 1131,
  //     message: 'You are not allowed to edit this record.'
  //   })
  // }

  // id is required, validating as not empty, valid numeric value with range.
  if (!id || isNaN(id)) {
    errorArray.push({
      field: 'id',
      error: 1132,
      message: '\'id\' is required as numeric in params.'
    })
  }

  //// checking product images and validating type
  if (req[`file`] && req[`file`] !== ``) {
    if (!req.file) {
      errorArray.push({
        field: 'image',
        error: 1006,
        message: 'Please provide valid image. Only gif/png/jgp allowed'
      })
    }
  }

  // name is an optional string property, if it is given than validate it.
  if (body['name'] && body['name'] !== ``) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.name) || !_.isString(body.name)) {
      errorArray.push({
        field: 'name',
        error: 1133,
        message: 'Please provide only valid \'name\' as string.'
      })
    }
    validatedData.name = body.name
  }

  // designation is an optional string property, if it is given than validate it.
  if (body['designation'] && body['designation'] !== ``) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.designation) || !_.isString(body.designation)) {
      errorArray.push({
        field: 'designation',
        error: 1133,
        message: 'Please provide only valid \'designation\' as string.'
      })
    }
    validatedData.designation = body.designation
  }

  // shortDescription is an optional string property, if it is given than validate it.
  if (body['shortDescription'] && body['shortDescription'] !== ``) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.shortDescription) || !_.isString(body.shortDescription)) {
      errorArray.push({
        field: 'shortDescription',
        error: 1136,
        message: 'Please provide only valid \'shortDescription\' as string, length must be between 2 and 100.'
      })
    }
    validatedData.shortDescription = body.shortDescription
  }

  // description is an optional string property, if it is given than validate it.
  if (body['description'] && body['description'] !== ``) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.description) || !_.isString(body.description)) {
      errorArray.push({
        field: 'description',
        error: 1136,
        message: 'Please provide only valid \'description\' as string.'
      })
    }
    validatedData.description = body.description
  }

  // productPrice is an optional string property, if it is given than validate it.
  if (body['productPrice'] && body['productPrice'] !== ``) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.productPrice) || _.isNaN(body.productPrice)) {
      errorArray.push({
        field: 'productPrice',
        error: 1136,
        message: 'Please provide only valid \'productPrice\' as string.'
      })
    }
    validatedData.productPrice = body.productPrice
  }

  // purchasingPrice is an optional string property, if it is given than validate it.
  if (body['purchasingPrice'] && body['purchasingPrice'] !== ``) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.purchasingPrice) || _.isNaN(body.purchasingPrice)) {
      errorArray.push({
        field: 'purchasingPrice',
        error: 1136,
        message: 'Please provide only valid \'purchasingPrice\' as string.'
      })
    }
    validatedData.purchasingPrice = body.purchasingPrice
  }

  // label is an optional string property, if it is given than validate it.
  if (body['label'] && body['label'] !== ``) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.label) || _.isNaN(body.label)) {
      errorArray.push({
        field: 'label',
        error: 1136,
        message: 'Please provide only valid \'label\' as string.'
      })
    }
    validatedData.label = body.label
  }

  // articleNo is an optional string property, if it is given than validate it.
  if (body['articleNo'] && body['articleNo'] !== ``) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.articleNo) || !_.isString(body.articleNo)) {
      errorArray.push({
        field: 'articleNo',
        error: 1136,
        message: 'Please provide only valid \'articleNo\' as string.'
      })
    }
    validatedData.articleNo = body.articleNo
  }

  // vatRate is an optional string property, if it is given than validate it.
  if (body['vatRate'] && body['vatRate'] !== ``) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.vatRate) || _.isNaN(body.vatRate)) {
      errorArray.push({
        field: 'vatRate',
        error: 1136,
        message: 'Please provide only valid \'vatRate\' as string.'
      })
    }
    validatedData.vatRate = body.vatRate
  }

  // orderForm is an optional string property, if it is given than validate it.
  if (body['orderForm'] && body['orderForm'] !== ``) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.orderForm) || !_.isString(body.orderForm)) {
      errorArray.push({
        field: 'orderForm',
        error: 1136,
        message: 'Please provide only valid \'orderForm\' as string.'
      })
    }
    validatedData.orderForm = body.orderForm
  }

  // sortCapture is an optional string property, if it is given than validate it.
  if (body['sortCapture'] && body['sortCapture'] !== ``) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.sortCapture) || !_.isString(body.sortCapture)) {
      errorArray.push({
        field: 'sortCapture',
        error: 1136,
        message: 'Please provide only valid \'sortCapture\' as string.'
      })
    }
    validatedData.sortCapture = body.sortCapture
  }

  // isActive is an optional string property, if it is given than validate it.
  if (body['isActive']) {
     // is active is required, validating it as boolean
    if (_.isEmpty(body.isActive) || !_.isString(body.isActive)) {
      errorArray.push({
      field: 'isActive',
      error: 1015,
      message: '\'isActive\' is required as boolean.'
      })
    }
    validatedData.isActive = body.isActive
  }

  // isTrailAvailable is an optional string property, if it is given than validate it.
  if (body['isTrailAvailable']) {
     // is active is required, validating it as boolean
    if (_.isEmpty(body.isTrailAvailable) || !_.isString(body.isTrailAvailable)) {
      errorArray.push({
      field: 'isTrailAvailable',
      error: 1015,
      message: '\'isTrailAvailable\' is required as boolean.'
      })
    }
    validatedData.isTrailAvailable = body.isTrailAvailable
  }

  // isHideOnSupplierOrder is an optional string property, if it is given than validate it.
  if (body['isHideOnSupplierOrder']) {
    // is active is required, validating it as boolean
   if (_.isEmpty(body.isHideOnSupplierOrder) || !_.isString(body.isHideOnSupplierOrder)) {
     errorArray.push({
     field: 'isHideOnSupplierOrder',
     error: 1015,
     message: '\'isHideOnSupplierOrder\' is required as boolean.'
     })
   }
   validatedData.isHideOnSupplierOrder = body.isHideOnSupplierOrder
  }

 // viewArticle is an optional string property, if it is given than validate it.
  if (body['viewArticle']) {
    // is active is required, validating it as boolean
    if (_.isEmpty(body.viewArticle) || !_.isString(body.viewArticle)) {
      errorArray.push({
      field: 'viewArticle',
      error: 1015,
      message: '\'viewArticle\' is required as boolean.'
      })
    }
    validatedData.viewArticle = body.viewArticle
  }

  // isGraded is an optional string property, if it is given than validate it.
  if (body['isGraded']) {
    // is active is required, validating it as boolean
    if (_.isEmpty(body.isGraded) || !_.isString(body.isGraded)) {
      errorArray.push({
      field: 'isGraded',
      error: 1015,
      message: '\'isGraded\' is required as boolean.'
      })
    }
    validatedData.isGraded = body.isGraded
  }

  // categoryId is an optional string property, if it is given than validate it.
  if (body['categoryId']) {
    // is active is required, validating it as boolean
    if (_.isNaN(body.categoryId)) {
      errorArray.push({
      field: 'categoryId',
      error: 1015,
      message: '\'categoryId\' is required as number.'
      })
    }
    validatedData.CategoryId = body.categoryId
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
  validatedData.weekDaysId = body.weekDaysId

  // Send error Array if error(s).
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'product.middleware.validateUpdateProduct')
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
