'use strict'

const _ = require('lodash')
const SERVER_RESPONSE = require('../config/serverResponses')
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')
const helpingHelperMethods = require('./helping.helper')

//// to create new order
async function createOrder(data) {
    let newOrder = db.Order.build(data);
    return newOrder.save()
        .then(async order => {
            let orderDetails = data.order;
            order = order.toJSON();
            
            //// saving data to customer order
            if (orderDetails.length) {
                for (let detail of orderDetails) {
                    detail.OrderId = order.id;
                    let customerOrder = db.CustomerOrder.build(detail)
                    await customerOrder.save();
                }
            }
        })
        .catch(generalHelpingMethods.catchException)
}

///// to get orders
function getOrder(input) {
    let query = input;
    query.isDeleted = false;
  
    return db.Order.findAll({ where: query })
        .then((orders) => {
            // convert mongoose document object to plain json object and return user
            return JSON.parse(JSON.stringify(orders))
        })
}

module.exports = {
    createOrder,
    getOrder
}