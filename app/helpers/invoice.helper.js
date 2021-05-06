'use strict'

const _ = require('lodash')
const PDFDocument = require('pdfkit');
const fs = require('fs');
const db = require('../config/sequelize.config')

//// to create new order
async function createInvoice(data) {
    let invoiceNumber;

    /// check if number already exist
    let isExist = true;
    while(isExist) {
        invoiceNumber = Math.round(Math.random() * 9000 + 100000);
        isExist = await checkNumber(invoiceNumber);
    }

    data.invoiceNumber = invoiceNumber;

    let newInvoice = db.Invoice.build(data);
    return newInvoice.save()
}

///// to get orders
function getInvoice(input) {
    let query = input;
    query.isDeleted = false;
  
    return db.Invoice.findAll({ 
        where: query,
        order: [
            ['createdAt', 'DESC'],
        ], 
    })
        .then((invoices) => {
            // convert mongoose document object to plain json object and return user
            return JSON.parse(JSON.stringify(invoices))
        })
}

function checkNumber(number) {
    let query = {invoiceNumber: number};
    query.isDeleted = false;
  
    return db.Invoice.findAll({ 
        where: query,
    })
        .then((invoices) => {
            if (invoices.length < 1) {
                return false;
            } else {
                return true;
            }
        })
}

///// to get orders
function getInvoicePDF(input) {
    let query = input;
    query.isDeleted = false;
  
    return db.Invoice.findOne({ 
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
                }
            ]
    })
        .then((invoice) => {
            // convert mongoose document object to plain json object and return user
            // console.log(invoice.toJSON());

            // Create a document
            const pdfDoc = new PDFDocument();


            // Pipe its output somewhere, like to a file or HTTP response
            // See below for browser usage
            pdfDoc.pipe(fs.createWriteStream('output.pdf'));
            // pdfDoc.pipe(invoice)
            pdfDoc.text(`Hello World How are you??`);

            pdfDoc.end();
           
            // return invoice
        })
}

module.exports = {
    createInvoice,
    getInvoice,
    getInvoicePDF
}