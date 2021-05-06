'use strict'

const SERVER_RESPONSE = require('../config/serverResponses')
const invoiceHelper = require('../helpers/invoice.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');
const db = require('../config/sequelize.config')

// Create New Order
const create = function (req, res) {
    return invoiceHelper.createInvoice(req.body)
        .then((data) => {
            generalController.successResponse(res, 'Invoice created successfully.', data, 'invoice.controller.create')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'invoice.controller.create', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'invoice.controller.create', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

// To Get Errors
const get = function (req, res) {
    return invoiceHelper.getInvoice(req.conditions)
        .then((data) => {
            generalController.successResponse(res, 'Invoices fetched successfully.', data, 'invoice.controller. get')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'invoice.controller. get', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'invoice.controller. get', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

// To Get Errors
const getPDF = function (req, res) {
    return invoiceHelper.getInvoicePDF(req.conditions)
        .then((data) => {
            // res.setHeader('Content-Type', 'application/pdf');
            
            // res.setHeader(
            //     'Content-Disposition',
            //     'inline; filename="' + 'output.pdf' + '"'
            // );
            generalController.successResponse(res, 'Invoice PDF fetched successfully.', data, 'invoice.controller.getPDF')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'invoice.controller.getPDF', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'invoice.controller.getPDF', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

const PDFTest = function (req, res) {
    let query = req.conditions;
    query.isDeleted = false;
  
    db.Invoice.findOne({ 
        where: query,
        include: 
            [
                {
                    model: db.Customer,
                    as: `CustomerInvoice`,
                    attributes: [`id`, `fName`, `lName`, `phone`, `postalCode`, `town`, `houseStreetNumber`],
                    required: false,
                },
                {
                    model: db.Order,
                    as: `OrderInvoice`,
                    required: false,
                    include: [
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
                    ]
                },
                {
                    model: db.AdditionalOrder,
                    as: `AdditionalOrderInvoice`,
                    required: false,
                    include: [
                        {
                            model: db.CustomerAdditionalOrder,
                            as: `AdditionalOrderDetail`,
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
                    ]
                }
            ]
    })
        .then((invoice) => {
            // convert mongoose document object to plain json object and return user
            invoice = invoice.toJSON();
            // console.log(invoice);

            let invoiceName = 'invoice-' + invoice.invoiceNumber + '.pdf';
            const invoicePath = path.join('documents', 'invoices', invoiceName);
            // Create a document
            const pdfDoc = new PDFDocument();
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader(
            'Content-Disposition',
            'inline; filename="' + invoiceName + '"'
            );
        
            // Pipe its output somewhere, like to a file or HTTP response
            // See below for browser usage
            pdfDoc.pipe(fs.createWriteStream(invoicePath));
            pdfDoc.pipe(res);

            /// header
            pdfDoc.image('public/assets/images/header.png', 0, 0, {width: 615})

            /// customer info
            pdfDoc.fontSize(12).text('Muhammad Shahbaz', 35, 170);
            pdfDoc.fontSize(12).text('HMC Road Taxila', 35, 187);
            pdfDoc.fontSize(12).text('11206 Rawalpindi', 35, 204);

            /// bill date details
            pdfDoc.fontSize(10).text('Date of Invoice:  05.06.2021', 330, 170);
            pdfDoc.fontSize(10).text('Customer Number:  123456' , 330, 187);
            pdfDoc.fontSize(10).text('Bill Number:  987654321', 330, 204);
            pdfDoc.fontSize(10).text('Delivery Period:  01.06.2021 - 30.06.2021', 330, 221);

            /// Message to customer
            pdfDoc.fontSize(14).text('Dear Ms. / Mr. Sufi,', 35, 260);
            pdfDoc.fontSize(9).text('We thank you for the orders and provide you with the following delivers as agreed charged:', 35, 288);

            /// footer
            pdfDoc.image('public/assets/images/foter.png', 0, 575, {width: 615})

            // pdfDoc.fontSize(26).text('Invoice', {
            //     underline: true
            // });
            // if (invoice.AdditionalOrderInvoice) {
            //     pdfDoc.text('Additional Order New');    
            // } else {
            //     pdfDoc.text('Regular Order');
            // }
        
            pdfDoc.end();
        })
}

module.exports = {
    create,
    get,
    getPDF,
    PDFTest
}