'use strict'

const _ = require('lodash')
const SERVER_RESPONSE = require('../config/serverResponses')
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')
const helpingHelperMethods = require('./helping.helper')


//// Partner registration
function registration(input, file) {
  let userObj = {
    name: input.name,
    email: input.email,
    phone: input.phone,
    houseStreetNumber: input.houseStreetNumber,
    town: input.town,
    iban: input.iban,
    postalCode: input.postalCode,
    image: `images/` + file.filename
  }
        
  // check if input phone already exist
  return db.Partner.findOne({ where: { phone: userObj.phone } })
  // execute all these functions
  .then(async (user) => {
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

    await db.Partner.findOne({ where: { email: userObj.email}})
    .then(partner => {
      if (partner) {
        // user email already exist.
        errorsArray.push({
          field: 'email',
          error: 1505,
          message: 'email already exist'
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

  return db.Partner.findOne({ where: query })
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
        return partner.toJSON()
      }
    })
    .then((partner) => {
      const partnerData = {
        id: partner.id,
        name: partner.name,
        email: partner.email,
        image: partner.image,
        phone: partner.phone,
        postalCode: partner.postalCode,
        houseStreetNumber: partner.houseStreetNumber,
        town: partner.town
      }
     
      return partnerData;
    })
}

///// to get all partners
function getAllPartners(input) {
  let query = {isDeleted: false }

  return db.Partner.findAll({
    where: query,
    attributes: { exclude: ['password', 'salt'] }
  })
}

module.exports = {
  registration,
  login,
  getPartnerByPostalCode,
  getAllPartners
}