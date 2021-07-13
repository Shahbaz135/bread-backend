'use strict'

const SERVER_RESPONSE = require('../config/serverResponses')
const logisticsHelper = require('../helpers/logistics.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')
const bakeryService = require ('../services/bakery.service')

const PDFDocument = require('pdfkit');
const { Op } = require('sequelize');
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
    let query = {};
    // if (req.conditions.date) {
    // }
    let givenDate = req.conditions.date;
    let givenDay = req.conditions.day;
    // query = req.conditions;
    query.isDeleted = false;
    query.isActive = true;

    let allProducts = [];
    let totalNumber = 0;
  
    return db.Customer.findAll({ 
        where: query,
        attributes: { exclude: ['password', 'salt']},
        include:
        [
            {
                model: db.AdditionalOrder,
                as: `CustomerAdditionalOrders`,
                where: {
                    deliveryDate: {
                        [Op.gte]: givenDate
                    }, 
                    isActive: true,
                    isDeleted: false
                },
                // attributes: [`id`, `deliveryDate`, `status`, `overAllPrice`, `isActive`],
                required: false,
                include: [
                    {
                        model: db.CustomerAdditionalOrder,
                        as: `AdditionalOrderDetail`,
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
            },
            {
                model: db.Order,
                as: `CustomerOrders`,
                where: {
                    // validFrom: {
                    //     [Op.gte]: date
                    // },
                    isActive: true,
                    isDeleted: false
                },
                // attributes: [`id`, `validFrom`, `expiryDate`, `status`, `overAllPrice`, `isTrail`, `isActive`, `isOneTime`],
                required: false,
                include: [
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
            },
        ]
    })
    .then(details => {
        details = JSON.parse(JSON.stringify(details));

        for(let customer of details) {
            /// normal orders
            if (customer.CustomerOrders.length > 0) {
                for (let order of customer.CustomerOrders) {
                    let foundDays = order.OrderDetail.map(x => x.OrderDay.id);
                    foundDays = _.uniq(foundDays);
                    let filteredDay = foundDays.find(x => x == givenDay);
                   

                    if(filteredDay) {
                        // for (let day of foundDays) {
                            let orderDay = 1;
                            if (filteredDay === 7) {
                                orderDay = 1;
                            } else {
                                orderDay = filteredDay + 1;
                            }
            
                            let found = order.OrderDetail.filter(x => x.OrderDay.id === filteredDay);
                            let countDay;
                            let selectedDaysInMonth = [];
                            if (found) {
                                if (order.isOneTime) {
                                    //// checking valid from date
                                    let validFromDate = new Date(order.validFrom);
                                    validFromDate = validFromDate.toISOString().split('T')[0];
                                    let expiryDate = new Date(order.expiryDate);
                                    expiryDate = expiryDate.toISOString().split('T')[0];
    
    
                                    let date = new Date();
                                    let currentMonth = date.getMonth();
                                    let currentYear = date.getFullYear();
    
                                    let monthDays = getAllDaysInMonth(currentYear, currentMonth+1, orderDay);
                                    
                                    let finalDays = [];
                                    for ( let d of monthDays) {
                                        d = d.toISOString().split('T')[0];
                                        if (d >= validFromDate && d <= expiryDate) {
                                            finalDays.push(d);
                                        }
                                    }
                                    selectedDaysInMonth = finalDays;
                                    countDay = finalDays.length;
                                } else {
                                    //// checking valid from date
                                    let orderDate = new Date(order.validFrom);
                                    orderDate = orderDate.getMonth() + `-` + orderDate.getFullYear();
                                    let date = new Date();
                                    let currentMonth = date.getMonth();
                                    let currentYear = date.getFullYear();
    
                                    let currentMonthYear = currentMonth + `-` + currentYear;
    
                                    if (orderDate == currentMonthYear) {
                                        // console.log(getAllDaysInMonth(currentYear, currentMonth+1, orderDay));
                                        let monthDays = getAllDaysInMonth(currentYear, currentMonth+1, orderDay);
                                        let finalDays = [];
                                        for ( let d of monthDays) {
                                            let validFrom = new Date(order.validFrom);
                                            validFrom = validFrom.toISOString().split('T')[0];
                                            d = d.toISOString().split('T')[0];
                                            if (d >= validFrom) {
                                                finalDays.push(d);
                                            }
                                        }
                                        selectedDaysInMonth = finalDays;
                                        countDay = finalDays.length;
                                    } else {
                                        countDay = getAllDaysInMonth(currentYear, currentMonth+1, orderDay).length;
                                        selectedDaysInMonth = getAllDaysInMonth(currentYear, currentMonth+1, orderDay);
                                    }
                                }

                                givenDate = new Date(givenDate);
                                givenDate = givenDate.toISOString().split('T')[0];

                                let foundDaysInMonth = selectedDaysInMonth.find(x => x == givenDate);

                                if (foundDaysInMonth) {
                                    for (let detail of found) {
                                        let productData = {
                                            product: detail.product,
                                            quantity: detail.quantity
                                        }

                                        /// first searching if product already exist
                                        let index = allProducts.findIndex(x => x.product == detail.product);
                                        if (index > -1) {
                                            allProducts[index].quantity = allProducts[index].quantity + detail.quantity
                                        } else {
                                            allProducts.push(productData);
                                        }

                                        totalNumber = totalNumber + Number(detail.quantity);
                                    }
                                }
                            }
                        // }
                    }
                }
            }
            if (customer.CustomerAdditionalOrders.length > 0) {
                for (let order of customer.CustomerAdditionalOrders) {
                    
                    let foundDays = order.AdditionalOrderDetail.map(x => x.OrderDay.id);
                    foundDays = _.uniq(foundDays);
                    let filteredDay = foundDays.find(x => x == givenDay);

                    if (filteredDay) {
                        // for (let day of foundDays) {
                            let orderDay = 1;
                            if (filteredDay === 7) {
                                orderDay = 1;
                            } else {
                                orderDay = filteredDay + 1;
                            }
            
                            let found = order.AdditionalOrderDetail.filter(x => x.OrderDay.id === filteredDay);
    
                            if (found) {
                                //// checking delivery date
                                let deliveryDate = new Date(order.deliveryDate);
                                let deliveryMonth = deliveryDate.getMonth();
                                let deliveryYear = deliveryDate.getFullYear();
                                
                                let monthYear = deliveryMonth + `-` + deliveryYear;
    
                                let date = new Date();
                                let currentMonth = date.getMonth();
                                let currentYear = date.getFullYear();
                                
                                let currentMonthYear = currentMonth + `-` + currentYear;
    
                                //// checking delivery is in current month
                                if (monthYear === currentMonthYear) {
                                    for (let detail of found) {
                                        let productData = {
                                            product: detail.product,
                                            quantity: detail.quantity
                                        }

                                        /// first searching if product already exist
                                        let index = allProducts.findIndex(x => x.product == detail.product);
                                        if (index > -1) {
                                            allProducts[index].quantity = allProducts[index].quantity + detail.quantity
                                        } else {
                                            allProducts.push(productData);
                                        }

                                        totalNumber = totalNumber + Number(detail.quantity);
                                    }
                                }                   
                            }
                        // }
                    }
                }
            }
        }
    })
    .then(async () => {
        let data = {
            UserId: 1
        }
        let bakeryData = await bakeryService.getBakery(data);
        return bakeryData.toJSON();
    })
    .then((bakeryData) => {
        givenDate = new Date(givenDate);
        givenDate = givenDate.toISOString().split('T')[0];

        let name = `supplier-order-.pdf`;
        let filePath = path.join('documents', 'supplier-orders', name);

        // Create a document
        let invoiceName = 'supplier-order.pdf';
        const invoicePath = path.join('documents', 'supplier-orders', invoiceName);
        const pdfDoc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
        'Content-Disposition',
        'inline; filename="' + invoiceName + '"'
        );
    
        // Generating pdf
        pdfDoc.pipe(fs.createWriteStream(invoicePath));
        pdfDoc.pipe(res);

        /// header
        pdfDoc.image('public/assets/images/header.png', 0, 0, {width: 615})
        /// footer
        pdfDoc.image('public/assets/images/foter.png', 0, 575, {width: 615})

        /// bakery info
        pdfDoc.font('Times-Bold').fontSize(12).text(bakeryData.name , 35, 170);
        pdfDoc.font('Times-Bold').fontSize(12).text(bakeryData.houseStreetNumber, 35, 187);
        pdfDoc.font('Times-Bold').fontSize(12).text(bakeryData.postalCode + ` ` + bakeryData.town, 35, 204);

        // /// bill date details
        // pdfDoc.font('Times-Roman').fontSize(10).text('Date of Invoice:', 330, 170);
        // pdfDoc.font('Times-Roman').fontSize(10).text(getFormattedDate(invoice.createdAt), 430, 170);

        // pdfDoc.font('Times-Roman').fontSize(10).text('Customer Number:' , 330, 187);
        // pdfDoc.font('Times-Roman').fontSize(10).text(`#` + customer.id, 430, 187);

        // pdfDoc.font('Times-Roman').fontSize(10).text('Bill Number:', 330, 204);
        // pdfDoc.font('Times-Roman').fontSize(10).text(`#`+ invoice.invoiceNumber, 430, 204);

        // pdfDoc.font('Times-Roman').fontSize(10).text('Delivery Period:', 330, 221);
        // pdfDoc.font('Times-Roman').fontSize(10).text(getFormattedDate(invoice.dateFrom) + ` - ` + getFormattedDate(invoice.dateTo), 430, 221);

        /// Message to customer
        pdfDoc.font('Times-Bold').fontSize(12).text('Order Supplier for ' + givenDate + `,`, 35, 260);
        // pdfDoc.font('Times-Roman').fontSize(11).text('We thank you for the orders and provide you with the following delivers as agreed charged:', 35, 288);

        // product details
        let rowHeight = 275;
        for(let product of allProducts) {
            pdfDoc.font('Times-Roman').fontSize(11).text( product.quantity +'   x ' + product.product, 35, rowHeight);
            rowHeight = rowHeight + 15;
        }

        pdfDoc.font('Times-Bold').fontSize(11).text('Total ' + totalNumber , 35, rowHeight);

        pdfDoc.end();
    })
}

function getAllDaysInMonth(year, month, dayNumber) {
    var d = new Date(year, --month, 1);
    var dates = [];
    var daysToFirst = (dayNumber + 7 - d.getDay()) % 7;
    var firstOf = new Date(d.setDate(d.getDate() + daysToFirst));
  
    while (firstOf.getMonth() == month) {
      dates.push(new Date(+firstOf));
      firstOf.setDate(firstOf.getDate() + 7);
    }
    return dates;
}


module.exports = {
    getOrderSupplier,
    getDeliveryList,
    getSupplierOrderPDF
}