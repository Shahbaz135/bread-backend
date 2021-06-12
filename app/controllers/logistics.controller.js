'use strict'

const SERVER_RESPONSE = require('../config/serverResponses')
const logisticsHelper = require('../helpers/logistics.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

const PDFDocument = require('pdfkit');
const _ = require('lodash')
const path = require('path');
const fs = require('fs');
const db = require('../config/sequelize.config')


// Get all categories of partner
const getOrderSupplier = function (req, res) {
    return logisticsHelper.getOrderSupplier(req.conditions)
        .then((data) => {
            generalController.successResponse(res, 'Bakery fetched successfully.', data, 'logistics.controller.getOrderSupplier')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'logistics.controller.getOrderSupplier', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'logistics.controller.getOrderSupplier', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

// to edit the categories
const getDeliveryList = function (req, res) {
    return logisticsHelper.getDeliveryList(req.conditions)
        .then((data) => {
            generalController.successResponse(res, 'Bakery updated successfully.', data, 'logistics.controller.getDeliveryList')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'logistics.controller.getDeliveryList', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'logistics.controller.getDeliveryList', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

const getSupplierOrderPDF = function (req, res) {
    let query = req.conditions;
    query.isDeleted = false;
    query.isActive = true;
  
    db.Order.findOne({ 
        where: query,
        include: 
            [
                {
                    model: db.CustomerOrder,
                    as: `OrderDetail`,
                    required: false,
                    include: [
                        {
                        model: db.WeekDays,
                        as: `OrderDay`,
                        attributes: [`id`, `day`],
                        required: false,
                        }
                    ]
                },
                // {
                //     model: db.AdditionalOrder,
                //     as: `AdditionalOrderInvoice`,
                //     required: false,
                //     include: [
                //         {
                //             model: db.CustomerAdditionalOrder,
                //             as: `AdditionalOrderDetail`,
                //             required: false,
                //             include: [
                //                 {
                //                 model: db.WeekDays,
                //                 as: `OrderDay`,
                //                 attributes: [`id`, `day`],
                //                 required: false,
                //                 }
                //             ]
                //         },
                //     ]
                // }
            ]
    })
}


module.exports = {
    getOrderSupplier,
    getDeliveryList,
}