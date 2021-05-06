'use strict'

const bakeryMiddleware = require('../middlewares/bakery.middleware')
const bakeryController = require('../controllers/bakery.controller')



module.exports = function (app, apiVersion) {
    const route = apiVersion

    // add/update
    app.post(route + '/bakery/update', bakeryMiddleware.validateUpdateBakery, bakeryController.updateBakery)

    app.get(route + '/bakery/get', bakeryMiddleware.validateGetBakery, bakeryController.getBakery)

}