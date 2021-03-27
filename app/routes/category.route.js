'use strict'

const categoryMiddleware = require('../middlewares/category.middleware')
const categoryController = require('../controllers/category.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
    const route = apiVersion

    // create new category
    app.post(route + '/category/add'  , categoryMiddleware.validateAddCategory, categoryController.createCategory)


    app.get(route + '/category/getByPartner', categoryMiddleware.validateGetAllCategories, categoryController.getAllCategories)

    app.get(route + '/category/getByAreaRegular', categoryMiddleware.validateGetCategoriesByArea, categoryController.getCategoriesByAreaRegular)


    app.put(route + '/category/update/:id', categoryMiddleware.validateUpdateCategory, categoryController.updateCategories)

}