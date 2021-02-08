'use strict'

const productMiddleware = require('../middlewares/product.middleware')
const productController = require('../controllers/product.controller')
const {uploadProductImage}  = require(`../utilitis/uploaders/product-image.uploader`)
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  // add product
  app.post(route + '/products/add', uploadProductImage.single(`image`), productMiddleware.validateAddProduct, productController.addProduct)

  // search product
  app.get(route + '/products/search', productMiddleware.validateSearchProducts, productController.searchProducts)

  // update product
  app.put(route + '/product/:id', passport.authenticate('jwt', { session: false }), productMiddleware.validateUpdateProduct, productController.updateProduct)

  // delete product
  app.delete(route + '/product/:id', passport.authenticate('jwt', { session: false }), productMiddleware.validateDeleteProduct, productController.deleteProduct)
}
 