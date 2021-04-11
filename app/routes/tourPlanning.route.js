'use strict'

const tourMiddleware = require('../middlewares/tourPlanning.middleware')
const tourController = require('../controllers/tourPlanning.controller')
const passport = require('../config/passport') 



module.exports = function (app, apiVersion) {
    const route = apiVersion

    // new partner registration
    app.post(route + '/tours/create', passport.authenticate('jwt', { session: false }), tourMiddleware.validateAddTour, tourController.createTour)

    app.get(route + '/tours/get', passport.authenticate('jwt', { session: false }), tourMiddleware.validateGetTours, tourController.getTours)

    app.post(route + '/tours/get', passport.authenticate('jwt', { session: false }), tourMiddleware.validateGetTours, tourController.getTours)

    // app.get(route + '/order/getById', orderMiddleware.validateGetOrderById, orderController.getOrderById)

    // // update tour
    app.put(route + '/tours/:id', passport.authenticate('jwt', { session: false }), tourMiddleware.validateUpdateTour, tourController.updateTour)

    // // delete tour
    app.delete(route + '/tours/:id', passport.authenticate('jwt', { session: false }), tourMiddleware.validateDeleteTour, tourController.deleteTour)

}