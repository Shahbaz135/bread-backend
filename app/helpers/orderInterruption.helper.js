'use strict'

const _ = require('lodash')
const SERVER_RESPONSE = require('../config/serverResponses')
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')
const helpingHelperMethods = require('./helping.helper')

//// to create new order
async function createInterruption(data) {
    let newInterruption = db.OrderInterruption.build(data);
    return newInterruption.save()
}

///// to get orders
function getOrderInterruptions(input) {
    let query = input;
    query.isDeleted = false;
  
    return db.OrderInterruption.findAll({ 
        where: query,
        order: [
            ['createdAt', 'DESC'],
        ], 
    })
        .then((orders) => {
            // convert mongoose document object to plain json object and return user
            return JSON.parse(JSON.stringify(orders))
        })
}

module.exports = {
    createInterruption,
    getOrderInterruptions
}