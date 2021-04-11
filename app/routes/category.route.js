'use strict'

const categoryMiddleware = require('../middlewares/category.middleware')
const categoryController = require('../controllers/category.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
    const route = apiVersion

    // create new category
    app.post(route + '/category/add', passport.authenticate('jwt', { session: false }), categoryMiddleware.validateAddCategory, categoryController.createCategory)

    app.get(route + '/category/getByPartner', passport.authenticate('jwt', { session: false }), categoryMiddleware.validateGetAllCategories, categoryController.getCategoriesByDay)

    app.get(route + '/category/getAll', passport.authenticate('jwt', { session: false }), categoryMiddleware.validateGetAllCategories, categoryController.getAllCategories)

    app.get(route + '/category/getByAreaRegular', passport.authenticate('jwt', { session: false }), categoryMiddleware.validateGetCategoriesByArea, categoryController.getCategoriesByAreaRegular)


    app.put(route + '/category/update/:id', passport.authenticate('jwt', { session: false }), categoryMiddleware.validateUpdateCategory, categoryController.updateCategories)

    app.delete(route + '/category/delete/:id', passport.authenticate('jwt', { session: false }), categoryMiddleware.validateDeleteCategory, categoryController.deleteCategory)

}