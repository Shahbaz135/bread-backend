'use strict'

const invoiceMiddleware = require('../middlewares/invoice.middleware')
const invoiceController = require('../controllers/invoice.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
    const route = apiVersion

    app.get(route + '/invoice/get', passport.authenticate('jwt', { session: false }), invoiceMiddleware.validateGet, invoiceController.get);

    app.get(route + '/invoice/get/pdf', invoiceMiddleware.validateGetPDF, invoiceController.PDFTest);

    //update
    app.put(route + '/invoice/update/:id', passport.authenticate('jwt', { session: false }), invoiceMiddleware.validateUpdateInvoice, invoiceController.updateInvoice)

    app.post(route + '/invoice/sendEmail', passport.authenticate('jwt', { session: false }), invoiceController.sendEmail);

    /// for billing
    app.get(route + '/invoice/billing', passport.authenticate('jwt', { session: false }), invoiceController.getInvoicesForBilling);

    /// for xml
    app.get(route + '/invoice/xml', invoiceController.generateXML);

}