'use strict'

const orderMiddleware = require('../middlewares/order.middleware')
const orderController = require('../controllers/order.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
    const route = apiVersion

    // new partner registration
    app.post(route + '/order/create', orderMiddleware.validateCreateOrder, orderController.createOrder)

    app.get(route + '/order/get', orderMiddleware.validateGetOrders, orderController.getOrders)

    app.get(route + '/order/getById', orderMiddleware.validateGetOrderById, orderController.getOrderById)

    // update product
    app.put(route + '/order/:id', orderMiddleware.validateUpdateOrder, orderController.updateOrder)

    // delete order
    app.delete(route + '/order/:id', orderMiddleware.validateDeleteOrder, orderController.deleteOrder)

}