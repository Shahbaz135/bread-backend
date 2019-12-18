'use strict'

const passport = require('../config/passport')
const roleMiddleware = require('../middlewares/role.middleware')
const roleController = require('../controllers/role.controller')

module.exports = function (app, apiVersion) {
  const route = apiVersion + '/role'

  // get role
  app.get(route, passport.authenticate('jwt', { session: false }), roleController.getRoles)

  // add role
  app.post(route, passport.authenticate('jwt', { session: false }), roleMiddleware.validateAddRole, roleController.addRole)

  // update role
  app.put(route + '/:id', passport.authenticate('jwt', { session: false }), roleMiddleware.validateUpdateRole, roleController.updateRole)

  // delete role
  app.put(route + '/:id/delete', passport.authenticate('jwt', { session: false }), roleMiddleware.validateDeleteRole, roleController.deleteRole)
}
