'use strict'

const logisticsMiddleware = require('../middlewares/logistics.middleware')
const logisticsController = require('../controllers/logistics.controller')



module.exports = function (app, apiVersion) {
    const route = apiVersion

    // add/update
    app.get(route + '/logistics/orderSupplier', logisticsMiddleware.validateGetOrderSupplier, logisticsController.getOrderSupplier)

    app.get(route + '/logistics/deliveryList', logisticsMiddleware.validateGetDeliveryList, logisticsController.getDeliveryList)

}