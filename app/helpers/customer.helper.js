'use strict'

const _ = require('lodash')
const SERVER_RESPONSE = require('../config/serverResponses')
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')
const helpingHelperMethods = require('./helping.helper')


//// Customer registration
function registration(input) {
  let userObj = {
    salutation: input.salutation,
    fName: input.fName,
    lName: input.lName,
    email: input.email,
    phone: input.phone,
    houseStreetNumber: input.houseStreetNumber,
    town: input.town,
    iban: input.iban,
    postalCode: input.postalCode,
    company: input.company,
    birthDay: input.birthDay,
    deliverNotes: input.deliverNotes,
    recommendationOf: input.recommendationOf,
    isTrail: input.isTrail,
    isWeb: input.isWeb,
    desiredDate: input.desiredDate,
    PartnerId: input.partnerId
  }
          
  // check if input phone already exist
  return db.Customer.findOne({ where: { phone: userObj.phone } })
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

    await db.Customer.findOne({ where: { email: userObj.email}})
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
    
    let newCustomer = db.Customer.build(userObj);
    newCustomer.salt = newCustomer.makeSalt()
    newCustomer.password = newCustomer.encryptPassword(input.password, newCustomer.salt)
    await newCustomer.save()

    return {
      id: newCustomer.id,
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
    }
  })
}


///// Customer Login
//// partner login
function login(input) {
  let phone = input.phone;
  let password = input.password;
  let userData = {}

  ///// check if user exsit and status is active
  return db.Customer.findOne({ where: { phone: phone, isDeleted: false } })
    .then((user) => {
      // console.log(`user ==`, user)
      if (!user || !user.salt || !user.password) {
        // user not found, throw error
        return generalHelpingMethods.rejectPromise([{
          field: 'phone',
          error: 1540,
          message: 'Invalid Credentials'
        }])
      } else if (!user.authenticate(password)) {
        // user not authenticated, throw error
        return generalHelpingMethods.rejectPromise([{
          field: 'phone',
          error: 1543,
          message: 'Invalid Credentials'
        }])
      } else {
        // convert mongoose document object to plain json object and return user
        return user.toJSON()
      }
    })
    .then(async (user) => {
      ///// getting partner of this customer
      await db.Partner.findOne({ where: { id: user.PartnerId, isDeleted: false, isActive: true } })
        .then(partner => {
          if (!partner) {
            // partner not found, throw error
            return generalHelpingMethods.rejectPromise([{
              field: 'Partner',
              error: 1540,
              message: 'Partner not found of this customer'
            }])
          }

          userData.partnerId = partner.toJSON().id;
        })

      userData.userInfo = user

      const tokenData = {
        id: userData.userInfo.id,
        partnerId: userData.partnerId,
        fName: userData.userInfo.fName,
        lName: userData.userInfo.lName,
        salutation: userData.userInfo.salutation,
        email: userData.userInfo.email,
        phone: userData.userInfo.phone,
        postalCode: userData.userInfo.postalCode,
        town: userData.userInfo.town,
        houseStreetNumber: userData.userInfo.houseStreetNumber,
        company:userData.userInfo.company,
        birthDay: userData.userInfo.birthDay,
        deliverNotes: userData.userInfo.deliverNotes,
        recommendationOf: userData.userInfo.recommendationOf,
        desiredDate: userData.userInfo.desiredDate
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

///// to get customers
function getCustomerById(data) {
  let query = {id: data.id};
  query.isDeleted = false;
  query.isActive = true;

  return db.Customer.findOne({ where: query })
    .then((customer) => {
      if (!customer) {
        // user not found, throw error
        return generalHelpingMethods.rejectPromise([{
          field: 'customer',
          error: 1540,
          message: 'Customer not found'
        }])
      } else {
        // convert mongoose document object to plain json object and return user
        return customer.toJSON()
      }
    })
    .then((customer) => {
      const customerData = {
        id: customer.id,
        fName: customer.fName,
        lName: customer.lName,
        salutation: customer.salutation,
        email: customer.email,
        phone: customer.phone,
        postalCode: customer.postalCode,
        town: customer.town,
        houseStreetNumber: customer.houseStreetNumber,
        company:customer.company,
        birthDay: customer.birthDay,
        deliverNotes: customer.deliverNotes,
        recommendationOf: customer.recommendationOf,
        desiredDate: customer.desiredDate
      }
     
      return customerData;
    })
}

const updateCustomer = (data, id) => {
  console.log(`data ===`, data);
  console.log(`id ==`, id)
  return db.Customer.findOne({
    where: {
      id: id,
      isDeleted: false
    }
  })
    .then((customer) => {
      if (_.isEmpty(customer)) {
        // Product not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1572,
          message: 'customer not found.'
        }])
      }
      // Update product
      // customer.update(data).then(updatedRecord => {
      //   console.log(updatedRecord);
      // })
      customer.set(data)
      return customer.save()
    })
}


module.exports = {
    registration,
    login,
    updateCustomer,
    getCustomerById
    // getPartnerByPostalCode,
    // getAllPartners
  }