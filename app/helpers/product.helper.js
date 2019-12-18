'use strict'
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')
const _ = require('lodash')

// search products
function searchProducts (conditions, limit = 50, offset = 0) {
  let baseQuery = 'SELECT `Products`.`id`, `Products`.`name`, `Products`.`nameUrdu`, `Products`.`unit`, `Products`.`unitUrdu`, `Products`.`thumb`' +
    ' FROM `Products`'

  if (conditions.SupplierId) {
    baseQuery = baseQuery + ' INNER JOIN `SupplierProducts` ON `SupplierProducts`.`ProductId` = `Products`.`id` '
  }

  baseQuery = baseQuery + ' WHERE `Products`.`isDeleted` = 0 AND `Products`.`isActive` = 1'

  if (conditions.SupplierId) {
    baseQuery = baseQuery + ' AND `SupplierProducts`.`SupplierId` = :SupplierId'
  }

  if (conditions.CategoryId) {
    baseQuery = baseQuery + ' AND `Products`.`CategoryId` = :CategoryId'
  }

  if (conditions.name) {
    baseQuery = baseQuery + ' AND (`Products`.`name` like \'%' + conditions.name + '%\' OR `Products`.`nameUrdu` like \'%' + conditions.name + '%\')'
  }

  // GROUP BY product id.
  baseQuery = baseQuery + ' GROUP BY `Products`.`id` ORDER BY 2'

  baseQuery = baseQuery + ' LIMIT :limit'
  conditions.limit = limit

  // Check for offset.
  if (!isNaN(offset)) {
    baseQuery = baseQuery + ' OFFSET :offset'
    conditions.offset = offset
  }

  return db.sequelize.query(baseQuery, {
    replacements: conditions,
    type: db.sequelize.QueryTypes.SELECT
  })
}

const updateProduct = (data, id) => {
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
  searchProducts,
  updateProduct,
  deleteProduct
}
