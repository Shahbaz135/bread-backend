'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')
const helpingHelperMethods = require('./helping.helper')
const _ = require('lodash')

// User signUp
function signUp (input) {
  
  let userObj = {
    Name: input.Name,
    email: input.email,
    // otp: Math.round(Math.random() * 9000 + 1000),
    // otpValidTill: now,
    phone: input.phone,
    landphone: input.landphone || ` `,
    country: input.country,
    city: input.city,
    user_type = input.user_type,
    RoleId: 1
  }

  console.log('userObj.phone', userObj.phone.toString)

  // check if input phone already exist
  return db.User.findOne({ where: { phone: userObj.phone } })
    // execute all these functions
    .then(async (user) => {
      console.log('user', user)

      const errorsArray = []
      // check user existence
      if (user) {
        // user phone already exist.
        errorsArray.push({
          field: 'phone',
          error: 1500,
          message: 'phone already exist'
        })
      }

      if (userObj.email) {
        if (db.User.findOne({ email: userObj.email })) {
          // user email already exist.
          errorsArray.push({
            field: 'email',
            error: 1505,
            message: 'email already exist'
          })
        }
      }

      if (!_.isEmpty(errorsArray)) {
        return generalHelpingMethods.rejectPromise(errorsArray, SERVER_RESPONSE.CONFLICT)
      }

      let newUser = db.User.build(userObj)
      newUser.salt = newUser.makeSalt()
      newUser.hashedPassword = newUser.encryptPassword(input.password, newUser.salt)
      await newUser.save()
      return {
        id: newUser.id,
        Name: newUser.Name,
        email: newUser.email,
        phone: newUser.phone,
        RoleId: newUser.RoleId,
        landphone: newUser.landphone,
        country: newUser.country,
        city: newUser.city,
        user_type = newUser.user_type,
        // isVerified: newUser.isVerified,
        // isBlocked: newUser.isBlocked,
      }
    })
}

// user Login
function login (input) {
  let phone = input.phone
  let password = input.password
  let userData = {}

  // check if phone exist and isDeleted equal to false
  return db.User.findOne({ where: { phone: phone, isDeleted: false } })
    .then((user) => {
      if (!user || !user.salt || !user.hashedPassword) {
        // user not found, throw error
        return generalHelpingMethods.rejectPromise([{
          field: 'phone',
          error: 1540,
          message: 'Invalid phone or Password'
        }])
      } else if (!user.authenticate(password)) {
        // user not authenticated, throw error
        return generalHelpingMethods.rejectPromise([{
          field: 'phone',
          error: 1543,
          message: 'Invalid phone or Password'
        }])
      } else {
        // convert mongoose document object to plain json object and return user
        return user.toJSON()
      }
    })
    .then((user) => {
      userData.userInfo = user
      return db.Role.findOne({ id: user.RoleId, isDeleted: false, isActive: true })
    })
    .then((role) => {
      if (!role) {
        // Active and not deleted role not found, throw error
        return generalHelpingMethods.rejectPromise([{
          field: 'Role',
          error: 1546,
          message: 'Role is not defined'
        }])
      }
      userData.userInfo.role = role.name
      // userData.userInfo.permissions = role.permissions

      const tokenData = {
        id: userData.userInfo.id,
        fName: userData.userInfo.fName,
        lName: userData.userInfo.lName,
        email: userData.userInfo.email,
        phone: userData.userInfo.phone,
        RoleId: userData.userInfo.RoleId,
        role: role.name
      }

      userData.userInfo = { ...tokenData,
        isVerified: userData.userInfo.isVerified,
        isBlocked: userData.userInfo.isBlocked,
        language: userData.userInfo.language
      }

      return helpingHelperMethods.signLoginData({ data: tokenData })
    })
    .then((tokenData) => {
      userData.tokenInfo = tokenData
      // console.log(userData)
      return userData
    })
}

// get users
function getUsers (conditions, limit = 500, offset = 0) {
  // Check if user exist in conditions
  return db.User.findAll({
    where: conditions,
    limit: limit,
    offset: offset
  })
    .then(async (users) => {
      const count = await db.User.count({
        where: conditions
      })
      // return user
      return {
        records: users,
        count: count
      }
    })
}

// Forgot Password
function forgotPassword (conditions) {
  // Check if user exist in conditions
  return db.User.findOne({ where: conditions })
    .then((user) => {
      if (!user) {
        // user not found, throw error
        return generalHelpingMethods.rejectPromise([{
          field: 'Role',
          error: 1561,
          message: 'No user found against this phone'
        }])
      }
      // Send sms
      return true
    })
}

// check reset passwords
const resetPassword = (input) => {
  // check if phone exist and isDeleted equal to false
  return db.User.findOne({
    where: {
      phone: input.phone,
      isDeleted: false
    }
  })
    .then(async (user) => {
      if (!user) {
        // user not found, throw error
        return generalHelpingMethods.rejectPromise([{
          field: '',
          error: 1569,
          message: 'User not found'
        }])
      }

      // Validate otp
      if (user.otp != input.otp || !input.otp || Date.parse(user.otpValidTill) < Date.parse(new Date())) {
        return generalHelpingMethods.rejectPromise([{
          field: 'otp',
          error: 1570,
          message: 'Otp not valid or expired'
        }])
      }

      user.salt = user.makeSalt()
      // hashing password, encrypted
      user.hashedPassword = user.encryptPassword(input.password, user.salt)
      user.isVerified = true
      user.otp = ''

      // save user
      await user.save()
      return user.toJSON()
    })
}

function getLoggedInUser (UserId) {
  // Find user against id.
  return db.User.findOne({
    where: {
      id: UserId,
      isDeleted: false
    }
  })
    .then((user) => {
      return user.toJSON()
    })
}

// Check password
const checkPassword = (input) => {
  let phone = input.phone
  let password = input.password
  // check if phone exist and isDeleted equal to false
  return db.User.findOne({
    where: {
      phone: phone,
      isDeleted: false
    }
  })
    .then((user) => {
      if (!user) {
        // user not found, throw error
        return generalHelpingMethods.rejectPromise([{
          field: 'Role',
          error: 1564,
          message: 'User not found'
        }])
      }

      if (!user.authenticate(password)) {
        return 'false'
      }
      return true
    })
}

// check reset passwords
const changePassword = (input) => {
  // check if phone exist and isDeleted equal to false
  return db.User.findOne({
    where: {
      phone: input.phone,
      isDeleted: false
    }
  })
    .then(async (user) => {
      if (!user) {
        // user not found, throw error
        return generalHelpingMethods.rejectPromise([{
          field: '',
          error: 1903,
          message: 'User not found'
        }])
      }

      // Validate password
      if (!user.authenticate(input.password)) {
        return generalHelpingMethods.rejectPromise([{
          field: 'password',
          error: 1906,
          message: 'Password not valid'
        }])
      }

      user.salt = user.makeSalt()
      // hashing newPassword, encrypted
      user.hashedPassword = user.encryptPassword(input.newPassword, user.salt)

      // save user
      await user.save()
      return user.toJSON()
    })
}

const updateUser = (data, id) => {
  return db.User.findOne({
    where: {
      id: id,
      isDeleted: false
    }
  })
    .then((user) => {
      if (_.isEmpty(user)) {
        // User not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1572,
          message: 'User not found.'
        }])
      }
      // Update user
      user.set(data)
      user.save()

      return user.toJSON()
    })
}

const deleteUser = (input) => {
  return db.User.findOne({
    where: {
      id: input.id,
      isDeleted: false
    }
  })
    .then((user) => {
      if (_.isEmpty(user)) {
        // Employee not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1575,
          message: 'No user found against given id.'
        }])
      }
      // employee found, change value of isDeleted to true
      user.isDeleted = true
      // save employee
      user.save()
      return true
    })
}

// Verify phone
function verifyOtp (input) {
  let phone = input.phone
  let otp = input.otp

  // check if phone exist and isDeleted equal to false
  return db.User.findOne({ where: { phone: phone, isVerified: false, isDeleted: false } })
    .then((user) => {
      if (!user) {
        // user not found, throw error
        return generalHelpingMethods.rejectPromise([{
          field: 'phone',
          error: 1578,
          message: 'No user found against this phone'
        }])
      }

      user.otp = parseInt(user.otp, 10)

      // matching otp against user verification code
      if (otp != user.otp || Date.parse(user.otpValidTill) < Date.parse(new Date())) {
        return generalHelpingMethods.rejectPromise([{
          field: 'phone',
          error: 1581,
          message: 'Failed to Verify phone, invalid otp or it is expired.'
        }])
      }

      user.otp = ''
      user.isVerified = true
      user.save()
      return true
    })
}

// Resend otp
function resendOtp (input) {
  let phone = input.phone

  // check if phone exist and isDeleted equal to false
  return db.User.findOne({ where: { phone: phone, isVerified: false } })
    .then((user) => {
      if (!user) {
        // user not found, throw error
        return generalHelpingMethods.rejectPromise([{
          field: 'phone',
          error: 1583,
          message: 'Invalid Phone'
        }])
      }

      let now = new Date()
      now.setMinutes(now.getMinutes() + 10) // timestamp
      now = new Date(now) // Date object

      user.otpValidTill = now
      user.otp = Math.round(Math.random() * 9000 + 1000)
      user.save()

      // Send otp
      return true
    })
}

module.exports = {
  signUp,
  login,
  getUsers,
  forgotPassword,
  checkPassword,
  resetPassword,
  changePassword,
  getLoggedInUser,
  updateUser,
  deleteUser,
  verifyOtp,
  resendOtp
}
