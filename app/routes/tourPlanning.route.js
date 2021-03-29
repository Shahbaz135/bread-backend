'use strict'

const tourMiddleware = require('../middlewares/tourPlanning.middleware')
const tourController = require('../controllers/tourPlanning.controller')



module.exports = function (app, apiVersion) {
    const route = apiVersion

    // new partner registration
    app.post(route + '/tours/create', tourMiddleware.validateAddTour, tourController.createTour)

    app.get(route + '/tours/get', tourMiddleware.validateGetTours, tourController.getTours)

    // app.get(route + '/order/getById', orderMiddleware.validateGetOrderById, orderController.getOrderById)

    // // update product
    // app.put(route + '/order/:id', orderMiddleware.validateUpdateOrder, orderController.updateOrder)

    // // delete order
    // app.delete(route + '/order/:id', orderMiddleware.validateDeleteOrder, orderController.deleteOrder)

}