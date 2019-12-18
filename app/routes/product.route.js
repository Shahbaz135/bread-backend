'use strict'

const productMiddleware = require('../middlewares/product.middleware')
const productController = require('../controllers/product.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  // search product
  app.get(route + '/products/search', productMiddleware.validateSearchProducts, productController.searchProducts)

  // update product
  app.put(route + '/product/:id', passport.authenticate('jwt', { session: false }), productMiddleware.validateUpdateProduct, productController.updateProduct)

  // delete product
  app.delete(route + '/product/:id', passport.authenticate('jwt', { session: false }), productMiddleware.validateDeleteProduct, productController.deleteProduct)
}
 