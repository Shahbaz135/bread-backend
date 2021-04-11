'use strict'

const customerMiddleware = require('../middlewares/customer.middleware')
const customerController = require('../controllers/customer.controller')
const passport = require('../config/passport') 


module.exports = function (app, apiVersion) {
    const route = apiVersion

    // new partner registration
    app.post(route + '/customer/register', customerMiddleware.validateRegistration, customerController.register)

    app.post(route + '/customer/login', customerMiddleware.validateLoginCredentials, customerController.login)

    // update customer
    app.put(route + '/customer/update/:id', passport.authenticate('jwt', { session: false }), customerMiddleware.validateUpdateCustomer, customerController.updateCustomer)

    app.get(route + '/customer/getById', passport.authenticate('jwt', { session: false }), customerMiddleware.validateGetCustomerById, customerController.getCustomerById)

    app.post(route + '/customer/checkPassword', passport.authenticate('jwt', { session: false }), customerMiddleware.validateChangePassword, customerController.checkPassword)

    app.post(route + '/customer/changePassword', passport.authenticate('jwt', { session: false }), customerMiddleware.validateChangePassword, customerController.changePassword)

    // new partner registration
    app.post(route + '/customer/create', passport.authenticate('jwt', { session: false }), customerMiddleware.validateCreateCustomer, customerController.createCustomer)

    app.get(route + '/customer/getAll', passport.authenticate('jwt', { session: false }), customerMiddleware.validateGetCustomers, customerController.getAllCustomers)

    app.delete(route + '/customer/delete/:id', passport.authenticate('jwt', { session: false }), customerMiddleware.validateDeleteCustomer, customerController.deleteCustomer)

}