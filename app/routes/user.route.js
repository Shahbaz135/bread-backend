'use strict'

const userMiddleware = require('../middlewares/user.middleware')
const userController = require('../controllers/user.controller')
const passport = require('../config/passport') 

module.exports = function (app, apiVersion) { 
  const route = apiVersion

  // ------------- Public Apis Start -------------
  // user-signup
  app.post(route + '/user/create', passport.authenticate('jwt', { session: false }), userMiddleware.validateSignUp, userController.signUp)

  // user login
  app.post(route + '/user/login', userMiddleware.validateLoginCredentials, userController.login)

  app.get(route + '/user/getAll', passport.authenticate('jwt', { session: false }), userMiddleware.validateGetUsers, userController.getUsers)

  // update user
  app.put(route + '/user/:id', passport.authenticate('jwt', { session: false }), userMiddleware.validateUpdateUser, userController.updateUser)

  // change password
  app.post(route + '/change-password', passport.authenticate('jwt', { session: false }), userMiddleware.validateChangePassword, userController.changeCurrentPassword)

  // delete user
  app.delete(route + '/user/:id', passport.authenticate('jwt', { session: false }), userMiddleware.validateDeleteUser, userController.deleteUser)

  // check user password
  app.post(route + '/check-password', passport.authenticate('jwt', { session: false }), userMiddleware.validateLoginCredentials, userController.checkPassword)

  
}
