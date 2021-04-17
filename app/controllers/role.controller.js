'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const roleHelper = require('../helpers/role.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// Create Role
const addRole = function (req, res) {
  return roleHelper.addRole(req.user._id, req.user.EmployeeCompanyId || req.user._id, req.user.RoleId.permissions, req.body)
    .then((data) => {
      generalController.successResponse(res, 'Role created successfully.', data, 'role.controller.addRole')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'role.controller.addRole', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'role.controller.addRole', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// get role
const getRoles = function (req, res) {
  return roleHelper.getRoles(req.conditions)
    .then((data) => {
      generalController.successResponse(res, 'Role get successfully.', data, 'role.controller.getRole')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'role.controller.getRole', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'role.controller.getRole', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// Update Role
const updateRole = function (req, res) {
  return roleHelper.updateRole(req.user._id, req.user.EmployeeCompanyId, req.user.RoleId.permissions, req.params.id, req.body)
    .then(function (data) {
      generalController.successResponse(res, 'Role updated successfully.', data, 'role.controller.updateRole')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'role.controller.updateRole', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'role.controller.updateRole', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// Delete Role
const deleteRole = function (req, res) {
  return roleHelper.deleteRole(req.user._id, req.user.EmployeeCompanyId, req.user.RoleId.permissions, req.params.id, req.body.password)
    .then(function (data) {
      generalController.successResponse(res, 'Role deleted successfully.', data, 'role.controller.deleteRole')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'role.controller.deleteRole', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'role.controller.deleteRole', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  addRole,
  getRoles,
  updateRole,
  deleteRole
}
