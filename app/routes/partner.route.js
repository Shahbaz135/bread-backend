'use strict'

const partnerMiddleware = require('../middlewares/partner.middleware')
const partnerController = require('../controllers/partner.controller')
const {uploadPartnerImage}  = require(`../utilitis/uploaders/partner-image.uploader`)
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
    const route = apiVersion

    // new partner registration
    app.post(route + '/partner/register'  , uploadPartnerImage.single('picture') , partnerMiddleware.validateRegistration, partnerController.register)

    app.post(route + '/partner/login', partnerMiddleware.validateLoginCredentials, partnerController.login)

    app.get(route + '/partner/getAll', partnerMiddleware.validateGetAllPartners, partnerController.getAllPartners)


    app.get(route + '/partner/getByPostalCode', partnerMiddleware.validateGetPartnerByPostalCode, partnerController.getPartnerByPostalCode)

    // update product
    app.put(route + '/partner/:id', partnerMiddleware.validateUpdatePartner, partnerController.updatePartner)

}