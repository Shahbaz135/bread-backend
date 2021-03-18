'use strict'

const deliveryAreaMiddleware = require('../middlewares/deliveryArea.middleware')
const deliveryAreaController = require('../controllers/DeliveryArea.controller')



module.exports = function (app, apiVersion) {
    const route = apiVersion

    // new partner registration
    app.post(route + '/deliveryArea/add', deliveryAreaMiddleware.validateAddDeliveryArea, deliveryAreaController.addDeliveryArea)

    // app.get(route + '/order/get', orderMiddleware.validateGetOrders, orderController.getOrders)

}