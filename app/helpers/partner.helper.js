'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')
const helpingHelperMethods = require('./helping.helper')
const _ = require('lodash')

//// Partner registration
function registration(input) {
    let userObj = {
        name: input.name,
        email: input.email,
        phone: input.phone,
        address: input.address,
        postalCode: input.postalCode
    }
        
    // check if input phone already exist
    return db.Partner.findOne({ where: { phone: userObj.phone } })
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
            // user_type = newUser.user_type,
            // isVerified: newUser.isVerified,
            // isBlocked: newUser.isBlocked,
          }
        })
}