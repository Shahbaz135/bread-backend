'use strict'

const nonDayMiddleware = require('../middlewares/nonDeliveryDays.middleware')
const nonDayController = require('../controllers/nonDeliveryDays.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
    const route = apiVersion

    // create new category
    app.post(route + '/nonDelivery/add', passport.authenticate('jwt', { session: false }), nonDayMiddleware.validateAddDay, nonDayController.addDay)

    app.get(route + '/nonDelivery/getAll', passport.authenticate('jwt', { session: false }), nonDayMiddleware.validateGetAlDays, nonDayController.getAllDays)

    app.delete(route + '/nonDelivery/clear/:id', passport.authenticate('jwt', { session: false }), nonDayMiddleware.validateDeleteDay, nonDayController.clearDay)


}