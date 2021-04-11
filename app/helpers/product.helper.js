'use strict'
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')
const _ = require('lodash')
const SERVER_RESPONSE = require('../config/serverResponses')


///// add new product
function addProduct(data, file) {
  data.image = `images/` + file.filename
  //// check if name of product is already added by partner
  return db.Product.findOne({
    where : {
      name: data.name,
    }
  })
  .then(async (product) => {
    const errorsArray = []
    // check product existence
    if (product) {
      // product already exist.
      errorsArray.push({
        field: 'name',
        error: 1500,
        message: 'product already exist with this name'
      })
    }

    if (!_.isEmpty(errorsArray)) {
      return generalHelpingMethods.rejectPromise(errorsArray, SERVER_RESPONSE.CONFLICT)
    }
    
    // let newProduct = db.Product.build(data);
    // await newProduct.save()

    return db.Product.create(data)
    .then(async (insertedProduct) => {

      // adding week days
      let dayIds = data.weekDaysId
      const productDays = []
      for (let i = 0; i < dayIds.length; i++) {
        productDays.push({
          ProductId: insertedProduct.id,
          WeekDaysId: dayIds[i]
        })
      }
      db.ProductDay.bulkCreate(productDays)
      return insertedProduct.save()
    })
    .catch(generalHelpingMethods.catchException)
  })
}

// search products
function searchProducts (conditions) {
  let query = conditions;
  query.isDeleted = false;
  
  return db.Product.findAll({ 
    where: query,
    order: [
      ['createdAt', 'DESC'],
    ],
    include:
      [
        {
          model: db.WeekDays,
          as: `productWeekDays`,
          attributes: [`id`, `day`],
          through: {attributes: []},
          required: false,
        }
      ]
  })
}

const updateProduct = (data, file, id) => {
  if (file) {
    data.image = `images/` + file.filename
  }

  return db.Product.findOne({
    where: {
      id: id,
      isDeleted: false
    }
  })
    .then((product) => {
      if (_.isEmpty(product)) {
        // Product not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1572,
          message: 'Product not found.'
        }])
      }
      // Update product
      product.set(data)
      return product.save()
        .then(async insertedProduct => {
          //// first deleting previous order details
          await db.ProductDay.destroy({
            where: {
              ProductId: id
            }
          })

          // adding week days
          let dayIds = data.weekDaysId
          const productDays = []
          for (let i = 0; i < dayIds.length; i++) {
            productDays.push({
              ProductId: id,
              WeekDaysId: dayIds[i]
            })
          }
          db.ProductDay.bulkCreate(productDays)
          return insertedProduct.save()
        })
    })
}

const deleteProduct = (input) => {
  return db.Product.findOne({
    where: {
      id: input.id,
      isDeleted: false
    }
  })
    .then((product) => {
      if (_.isEmpty(product)) {
        // Employee not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1575,
          message: 'No product found against given id.'
        }])
      }
      // employee found, change value of isDeleted to true
      product.isDeleted = true
      // save employee
      product.save()
      return true
    })
}

module.exports = {
  addProduct,
  searchProducts,
  updateProduct,
  deleteProduct
}
