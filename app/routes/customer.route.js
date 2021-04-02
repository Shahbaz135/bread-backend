'use strict'

const customerMiddleware = require('../middlewares/customer.middleware')
const customerController = require('../controllers/customer.controller')



module.exports = function (app, apiVersion) {
    const route = apiVersion

    // new partner registration
    app.post(route + '/customer/register', customerMiddleware.validateRegistration, customerController.register)

    app.post(route + '/customer/login', customerMiddleware.validateLoginCredentials, customerController.login)

     // update product
    app.put(route + '/customer/update/:id', customerMiddleware.validateUpdateCustomer, customerController.updateCustomer)

    app.get(route + '/customer/getById', customerMiddleware.validateGetCustomerById, customerController.getCustomerById)

    app.post(route + '/customer/checkPassword', customerMiddleware.validateChangePassword, customerController.checkPassword)

    app.post(route + '/customer/changePassword', customerMiddleware.validateChangePassword, customerController.changePassword)

    // new partner registration
    app.post(route + '/customer/create', customerMiddleware.validateCreateCustomer, customerController.createCustomer)

    // app.get(route + '/getAllPartners', partnerMiddleware.validateGetAllPartners, partnerController.getAllPartners)


    // app.get(route + '/getPartnerByPostalCode', partnerMiddleware.validateGetPartnerByPostalCode, partnerController.getPartnerByPostalCode)

}