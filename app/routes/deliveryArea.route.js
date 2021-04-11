'use strict'

const deliveryAreaMiddleware = require('../middlewares/deliveryArea.middleware')
const deliveryAreaController = require('../controllers/DeliveryArea.controller')
const passport = require('../config/passport')



module.exports = function (app, apiVersion) {
    const route = apiVersion

    // new partner registration
    app.post(route + '/deliveryArea/add', passport.authenticate('jwt', { session: false }), deliveryAreaMiddleware.validateAddDeliveryArea, deliveryAreaController.addDeliveryArea)

    app.get(route + '/deliveryArea/get', passport.authenticate('jwt', { session: false }), deliveryAreaMiddleware.validateGetDeliveryAreas, deliveryAreaController.getDeliveryArea)

    app.put(route + '/deliveryArea/update/:id', passport.authenticate('jwt', { session: false }), deliveryAreaMiddleware.validateUpdateDeliveryArea, deliveryAreaController.updateDeliveryArea)

    app.delete(route + '/deliveryArea/:id', passport.authenticate('jwt', { session: false }), deliveryAreaMiddleware.validateDeleteArea, deliveryAreaController.deleteDeliveryArea)

}