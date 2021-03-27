'use strict'

const interruptionMiddleware = require('../middlewares/orderInterruption.middleware')
const interruptionController = require('../controllers/orderInterruption.controller')



module.exports = function (app, apiVersion) {
    const route = apiVersion

    // new partner registration
    app.post(route + '/interruption/create', interruptionMiddleware.validateCreateInterruption, interruptionController.createInterruption)

    app.get(route + '/interruption/get', interruptionMiddleware.validateGetInterruption, interruptionController.getInterruptions)

}