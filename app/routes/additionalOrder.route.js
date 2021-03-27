'use strict'

const orderMiddleware = require('../middlewares/additionalOrder.middleware')
const orderController = require('../controllers/additionalOrder.controller')



module.exports = function (app, apiVersion) {
    const route = apiVersion

    // new partner registration
    app.post(route + '/order/addition/create', orderMiddleware.validateCreateOrder, orderController.createOrder)

    app.get(route + '/order/addition/get', orderMiddleware.validateGetOrders, orderController.getOrders)

    app.get(route + '/order/addition/getById', orderMiddleware.validateGetOrderById, orderController.getOrderById)

    // update product
    // app.put(route + '/additionOrder/:id', orderMiddleware.validateUpdateOrder, orderController.updateOrder)

    // delete order
    app.delete(route + '/order/addition/:id', orderMiddleware.validateDeleteOrder, orderController.deleteOrder)

}