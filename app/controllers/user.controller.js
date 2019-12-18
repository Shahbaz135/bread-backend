'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const userHelper = require('../helpers/user.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')
 
// Create New User
const signUp = function (req, res) {
  return userHelper.signUp(req.body)
    .then((data) => {
      generalController.successResponse(res, 'User Register successfully.', data, 'user.controller.signUp')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'user.controller.signUp', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'user.controller.signUp', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// User Login
const login = function (req, res) {
  return userHelper.login(req.body)
    .then((data) => {
      generalController.successResponse(res, 'User login successfully.', data, 'user.controller.login')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'user.controller.login', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'user.controller.login', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// Change Password
const changePassword = function (req, res) {
  return userHelper.changePassword(req.body, req.user.data)
    .then(function (data) {
      generalController.successResponse(res, 'Password changed successfully.', data, 'user.controller.changePassword')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'user.controller.changePassword', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'user.controller.changePassword', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// Verify Phone
const verifyOtp = function (req, res) {
  return userHelper.verifyOtp(req.body)
    .then(function (data) {
      generalController.successResponse(res, 'Phone Verified successfully.', data, 'user.controller.verifyOtp')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'user.controller.verifyOtp', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'user.controller.verifyOtp', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// Resend Otp
const resendOtp = function (req, res) {
  return userHelper.resendOtp(req.body)
    .then(function (data) {
      generalController.successResponse(res, 'Otp Sent successfully.', data, 'user.controller.verifyOtp')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'user.controller.resendOtp', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'user.controller.resendOtp', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// Get Users
const getUsers = function (req, res) {
  return userHelper.getUsers(req.conditions, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, 'Users fetched successfully.', data, 'user.controller.getUsers')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'user.controller.getUsers', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'user.controller.getUsers', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// Forgot Password
const forgotPassword = function (req, res) {
  return userHelper.forgotPassword(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Reset pin sent successfully.', data, 'user.controller.forgotPassword')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'user.controller.forgotPassword', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'user.controller.forgotPassword', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// reset password
const resetPassword = function (req, res) {
  return userHelper.resetPassword(req.body)
    .then(function (data) {
      generalController.successResponse(res, 'Successfully update the user password', data, 'user.controller.resetPassword')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'user.controller.resetPassword', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'user.controller.resetPassword', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// Get data of logged in user.
const getLoggedInUser = function (req, res) {
  return userHelper.getLoggedInUser(req.user.id)
    .then(function (data) {
      generalController.successResponse(res, 'Successfully found user.', data, 'user.controller.getLoggedInUser')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'user.controller.getLoggedInUser', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'user.controller.getLoggedInUser', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// Check input password is correct.
const checkPassword = function (req, res) {
  return userHelper.checkPassword(req.body)
    .then(function (data) {
      generalController.successResponse(res, 'Successfully check the user password', data, 'user.controller.checkPassword')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'user.controller.checkPassword', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'user.controller.checkPassword', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const updateUser = function (req, res) {
  return userHelper.updateUser(req.body.data, req.body.id)
    .then(function (data) {
      generalController.successResponse(res, 'Successfully update the user info', data, 'user.controller.updateUser')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'user.controller.updateUser', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'user.controller.updateUser', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const checkCurrentPassword = function (req, res) {
  return userHelper.checkPassword({ phone: req.user.phone, password: req.body.password })
    .then(function (data) {
      generalController.successResponse(res, 'User password matched', data, 'user.controller.checkCurrentPassword')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'user.controller.checkCurrentPassword', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'user.controller.checkCurrentPassword', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const changeCurrentPassword = function (req, res) {
  return userHelper.resetPassword(req.body)
    .then(function (data) {
      generalController.successResponse(res, 'User password changed successfully', data, 'user.controller.changeCurrentPassword')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'user.controller.changeCurrentPassword', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'user.controller.changeCurrentPassword', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const deleteUser = (req, res) => {
  return userHelper.deleteUser(req.params)
    .then(function (data) {
      generalController.successResponse(res, 'User deleted successfully', data, 'user.controller.deleteUser')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'user.controller.deleteUser', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'user.controller.deleteUser', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  signUp,
  login,
  getUsers,
  forgotPassword,
  changePassword,
  checkPassword,
  resetPassword,
  getLoggedInUser,
  updateUser,
  checkCurrentPassword,
  changeCurrentPassword,
  deleteUser,
  verifyOtp,
  resendOtp
}
