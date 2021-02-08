'use strict'

const orderMiddleware = require('../middlewares/order.middleware')
const orderController = require('../controllers/order.controller')



module.exports = function (app, apiVersion) {
    const route = apiVersion

    // new partner registration
    app.post(route + '/order/create', orderMiddleware.validateCreateOrder, orderController.createOrder)

    app.get(route + '/order/get', orderMiddleware.validateGetOrders, orderController.getOrders)


    // app.post(route + '/customer/login', customerMiddleware.validateLoginCredentials, customerController.login)

    // app.get(route + '/getAllPartners', partnerMiddleware.validateGetAllPartners, partnerController.getAllPartners)



}