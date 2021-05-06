'use strict'

const chargeMiddleware = require('../middlewares/deliveryCharge.middleware')
const chargeController = require('../controllers/deliveryCharge.controller')



module.exports = function (app, apiVersion) {
    const route = apiVersion

    // add/update
    app.post(route + '/deliveryCharges/update', chargeMiddleware.validateUpdateCharge, chargeController.updateCharge)

    app.get(route + '/deliveryCharges/get', chargeMiddleware.validateGetAllCharge, chargeController.getDeliveryCharges)

}