'use strict'

const _ = require('lodash')
const SERVER_RESPONSE = require('../config/serverResponses')
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')
const helpingHelperMethods = require('./helping.helper')


//// Partner registration
function registration(input, file) {
  let userObj = input;

  if (file) {
    userObj.image = `images/` + file.filename
  }
        
  // check if input phone already exist
  return db.Partner.findOne({ where: { email: userObj.email } })
  // execute all these functions
  .then(async (user) => {
    const errorsArray = []
    // check user existence
    if (user) {
      // user phone already exist.
      errorsArray.push({
          field: 'email',
          error: 1500,
          message: 'Franchise already exist with this email'
      })
    }

    await db.Partner.findOne({ where: { postalCode: userObj.postalCode}})
    .then(partner => {
      if (partner) {
        // user email already exist.
        errorsArray.push({
          field: 'Postal Code',
          error: 1505,
          message: 'Franchise already exist with this Postal Code'
        })
      }
    })
    
    if (!_.isEmpty(errorsArray)) {
      return generalHelpingMethods.rejectPromise(errorsArray, SERVER_RESPONSE.CONFLICT)
    }
    
    let newPartner = db.Partner.build(userObj);
    newPartner.salt = newPartner.makeSalt()
    newPartner.password = newPartner.encryptPassword(input.password, newPartner.salt)
    await newPartner.save()
    return {
      id: newPartner.id,
      name: newPartner.name,
      email: newPartner.email,
      phone: newPartner.phone,
    }
  })
}

//// partner login
function login(input) {
  let email = input.email;
  let password = input.password;
  let userData = {}

  ///// check if user exsit and status is active
  return db.Partner.findOne({ where: { email: email, isDeleted: false } })
    .then((user) => {
      // console.log(`user ==`, user)
      if (!user || !user.salt || !user.password) {
        // user not found, throw error
        return generalHelpingMethods.rejectPromise([{
          field: 'email',
          error: 1540,
          message: 'Invalid email or Password'
        }])
      } else if (!user.authenticate(password)) {
        // user not authenticated, throw error
        return generalHelpingMethods.rejectPromise([{
          field: 'email',
          error: 1543,
          message: 'Invalid email or Password'
        }])
      } else {
        // convert mongoose document object to plain json object and return user
        return user.toJSON()
      }
    })
    .then((user) => {
      userData.userInfo = user

      const tokenData = {
        id: userData.userInfo.id,
        name: userData.userInfo.name,
        email: userData.userInfo.email,
        phone: userData.userInfo.phone,
        image: userData.userInfo.image,
        postalCode: userData.userInfo.postalCode,
        town: userData.userInfo.town
      }

      userData.userInfo = {
        ...tokenData,
        // permissions: userData.userInfo.permissions,
        isVerified: userData.userInfo.isVerified,
        isActive: userData.userInfo.isActive,
        // language: userData.userInfo.language
      }

      return helpingHelperMethods.signLoginData({ data: tokenData })
    })
    .then((tokenData) => {
      userData.tokenInfo = tokenData
      // console.log(userData)
      return userData
    })
}

///// to get franchise partner by postal code
function getPartnerByPostalCode(input) {
  let query = input;
  query.isDeleted = false;
  query.isActive = true;

  return db.Partner.findOne({ 
    where: query,
    attributes: { exclude: ['password', 'salt']}
   })
    .then((partner) => {
      if (!partner) {
        // user not found, throw error
        return generalHelpingMethods.rejectPromise([{
          field: 'postal code',
          error: 1540,
          message: 'Currently no partner is available in your area'
        }])
      } else {
        // convert mongoose document object to plain json object and return user
        return partner
      }
    })
}

///// to get all partners
function getAllPartners(input) {
  let query = {isDeleted: false }

  return db.Partner.findAll({
    where: query,
    order: [
      ['createdAt', 'ASC'],
    ], 
    attributes: { exclude: ['password', 'salt'] }
  })
}

//// to edit partners
function updatePartner(data, id) {
  return db.Partner.findOne({
    where: {
      id: id,
      isDeleted: false
    }
  })
    .then((partner) => {
      if (_.isEmpty(partner)) {
        // Product not found, return error
        return generalHelpingMethods.rejectPromise([{
        field: 'id',
        error: 1572,
        message: 'Partner not found.'
        }])
      }
      // Update partner
      partner.set(data);
      return partner.save();
    })
}

module.exports = {
  registration,
  login,
  getPartnerByPostalCode,
  getAllPartners,
  updatePartner
}