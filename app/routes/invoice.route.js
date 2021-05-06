'use strict'

const invoiceMiddleware = require('../middlewares/invoice.middleware')
const invoiceController = require('../controllers/invoice.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
    const route = apiVersion

    // add/update
    // app.post(route + '/bakery/update', bakeryMiddleware.validateUpdateBakery, bakeryController.updateBakery)

    app.get(route + '/invoice/get', invoiceMiddleware.validateGet, invoiceController.get);

    // app.get(route + '/invoice/get/pdf', invoiceMiddleware.validateGetPDF, invoiceController.getPDF);

    app.get(route + '/invoice/get/pdf', invoiceMiddleware.validateGetPDF, invoiceController.PDFTest);

}