'use strict'

const _ = require('lodash')
const SERVER_RESPONSE = require('../config/serverResponses')
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')
const invoiceService = require(`../services/invoice.service`);


//// to create new order
async function createOrder(data) {
    if (!data.status) {
        data.status = `pending`;
    }
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
  
    return db.Order.findAll({ 
        where: query,
        order: [
            ['createdAt', 'DESC'],
        ], 
    })
        .then((orders) => {
            // convert mongoose document object to plain json object and return user
            invoiceService.initiateInvoice();
            return JSON.parse(JSON.stringify(orders))
        })
}

///// to get order by id
function getOrderById(input) {
    let query = input;
    query.isDeleted = false;
  
    return db.Order.findOne({ 
        where: query,
        attributes: [`id`, `validFrom`, `expiryDate`, `status`, `overAllPrice`, `productPrice`, `deliveryCharges`],
        include:
            [
                {
                    model: db.CustomerOrder,
                    as: `OrderDetail`,
                    attributes: [`id`, `quantity`, `product`, `price`],
                    required: false,
                    include: [
                        {
                            model: db.WeekDays,
                            as: `OrderDay`,
                            attributes: [`id`, `day`],
                            required: false,
                        }
                    ]
                }
            ]
    })
        .then((order) => {
            if (_.isEmpty(order)) {
                // Product not found, return error
                return generalHelpingMethods.rejectPromise([{
                field: 'id',
                error: 1572,
                message: 'Order not found.'
                }])
            }
            // convert mongoose document object to plain json object and return user
            return order.toJSON()
        })
}

///// to change/update order
const updateOrder = (data, id) => {
    return db.Order.findOne({
      where: {
        id: id,
        isDeleted: false
      }
    })
        .then((order) => {
        if (_.isEmpty(order)) {
            // Product not found, return error
            return generalHelpingMethods.rejectPromise([{
            field: 'id',
            error: 1572,
            message: 'Order not found.'
            }])
        }
        // Update product
        order.set(data)
        return order.save()
            .then(async detail => {
                //// first deleting previous order details
                await db.CustomerOrder.destroy({
                    where: {
                        OrderId: id,
                        isDeleted: false
                    }
                })

                let orderDetails = data.order;
                detail = detail.toJSON();
                
                // //// saving data to customer order
                if (orderDetails.length) {
                    for (let details of orderDetails) {
                        details.OrderId = id;
                        let customerOrder = db.CustomerOrder.build(details)
                        await customerOrder.save();
                    }
                }
            })
            
        })
}

//// to delete order
const deleteOrder = (input) => {
    return db.Order.findOne({
      where: {
        id: input.id,
        isDeleted: false
      }
    })
      .then((order) => {
        if (_.isEmpty(order)) {
          // Employee not found, return error
          return generalHelpingMethods.rejectPromise([{
            field: 'id',
            error: 1575,
            message: 'No order found against given id.'
          }])
        }
        // employee found, change value of isDeleted to true
        order.isDeleted = true
        // save employee
        order.save()
        return true
    })
}

module.exports = {
    createOrder,
    getOrder,
    getOrderById,
    updateOrder,
    deleteOrder
}