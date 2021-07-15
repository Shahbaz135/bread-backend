'use strict'

const SERVER_RESPONSE = require('../config/serverResponses')
const invoiceHelper = require('../helpers/invoice.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

const PDFDocument = require('pdfkit');
var SEPA = require("sepa");
const _ = require('lodash')
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

/// update
const updateInvoice = function (req, res) {
    return invoiceHelper.updateInvoice(req.body.data, req.body.id)
      .then(function (data) {
        generalController.successResponse(res, 'Successfully updated the invoice status', data, 'invoice.controller.updateInvoice')
      }).catch(StandardError, function (err) {
        generalController.errorResponse(res, err, null, 'invoice.controller.updateInvoice', SERVER_RESPONSE.VALIDATION_ERROR)
      }).catch(function (err) {
        generalController.errorResponse(res, err, 'Please check originalError for details', 'invoice.controller.updateInvoice', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
      })
}

/// send email
const sendEmail = function (req, res) {
    return invoiceHelper.sendEmail(req.body)
      .then(function (data) {
        generalController.successResponse(res, 'Email sendt Successfully', data, 'invoice.controller.sendEmail')
      }).catch(StandardError, function (err) {
        generalController.errorResponse(res, err, null, 'invoice.controller.sendEmail', SERVER_RESPONSE.VALIDATION_ERROR)
      }).catch(function (err) {
        generalController.errorResponse(res, err, 'Please check originalError for details', 'invoice.controller.sendEmail', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
      })
}

/// for billing
const getInvoicesForBilling = function (req, res) {
    return invoiceHelper.invoicesForBilling(req.body)
      .then(function (data) {
        generalController.successResponse(res, 'Record Fetched Successfully', data, 'invoice.controller.getInvoicesForBilling')
      }).catch(StandardError, function (err) {
        generalController.errorResponse(res, err, null, 'invoice.controller.getInvoicesForBilling', SERVER_RESPONSE.VALIDATION_ERROR)
      }).catch(function (err) {
        generalController.errorResponse(res, err, 'Please check originalError for details', 'invoice.controller.getInvoicesForBilling', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
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
    query.isActive = true;
  
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

            /// checking if file exist
            let name = `invoice-`+ invoice.invoiceNumber+ `.pdf`;
            let filePath = path.join('documents', 'invoices', name);
            // const path = './file.txt'

            try {
                if (fs.existsSync(filePath)) {
                    //if file exist then return that file
                    console.log(`---- File Exist ---`);
                    const file = fs.readFileSync(filePath, (err, data) => {
                        if (err) {
                            return error;
                        } 
                        res.setHeader('Content-Type', 'application/pdf');
                        res.setHeader(
                        'Content-Disposition',
                        'attachment; filename="' + name + '"'
                        );

                        res.send(data);
                    });

                    // res.setHeader('Content-Type', 'application/pdf');
                    // res.setHeader(
                    // 'Content-Disposition',
                    // 'inline; filename="' + name + '"'
                    // );
                    // file.pipe(res);
                    // return;
                } 
            } catch(err) {
                console.error(err)
            }
            
            //// if file not exist then creating new one
            let customer = {};
            let allData = [];

            //// customer information
            if (invoice.CustomerInvoice) {
                customer = invoice.CustomerInvoice;
            }

            /// getting order details
            if (invoice.OrderInvoice) {
                let foundDays = invoice.OrderInvoice.OrderDetail.map(x => x.OrderDay.id);
                foundDays = _.uniq(foundDays);

                for (let day of foundDays) {
                    let orderDay = 1;
                    if (day === 7) {
                        orderDay = 1;
                    } else {
                        orderDay = day + 1;
                    }

                    let found =  invoice.OrderInvoice.OrderDetail.filter(x => x.OrderDay.id === day);

                    // console.log(`found == `, found);
                    if (found) {
                        if (invoice.OrderInvoice.isOneTime) {
                            //// checking valid from date
                            let validFromDate = new Date(invoice.OrderInvoice.validFrom);
                            validFromDate = validFromDate.toISOString().split('T')[0];
                            let expiryDate = new Date(invoice.OrderInvoice.expiryDate);
                            expiryDate = expiryDate.toISOString().split('T')[0];


                            let date = new Date();
                            let currentMonth = date.getMonth();
                            let currentYear = date.getFullYear();

                            let monthDays = getAllDaysInMonth(currentYear, currentMonth+1, orderDay);
                            // console.log(`month days === `, monthDays);
                            for ( let d of monthDays) {
                                d = d.toISOString().split('T')[0];
                                if (d >= validFromDate && d <= expiryDate) {
                                    // console.log(`found == `, found);
                                    let obj = {
                                        day: found[0].OrderDay.day,
                                        date: d,
                                        products: []
                                    };

                                    for (let record of found) {
                                        let subObj = {
                                            name: record.product,
                                            quantity: record.quantity,
                                            price: record.price
                                        };

                                        obj.products.push(subObj);
                                    }

                                    allData.push(obj);
                                }
                            }
                            // console.log(allData);
                        } else {
                            //// checking valid from date
                            let orderDate = new Date(invoice.OrderInvoice.validFrom);
                            orderDate = orderDate.getMonth() + `-` + orderDate.getFullYear();
                            let date = new Date();
                            let currentMonth = date.getMonth();
                            let currentYear = date.getFullYear();

                            let currentMonthYear = currentMonth + `-` + currentYear;

                            let monthDays = getAllDaysInMonth(currentYear, currentMonth+1, orderDay);
                            if (orderDate == currentMonthYear) {
                                // let monthDays = getAllDaysInMonth(currentYear, currentMonth+1, orderDay);
                                for ( let d of monthDays) {
                                    let validFrom = new Date(invoice.OrderInvoice.validFrom);
                                    validFrom = validFrom.toISOString().split('T')[0];
                                    d = d.toISOString().split('T')[0];
                                    if (d >= validFrom) {
                                        let obj = {
                                            day: found[0].OrderDay.day,
                                            date: d,
                                            products: []
                                        };
    
                                        for (let record of found) {
                                            let subObj = {
                                                name: record.product,
                                                quantity: record.quantity,
                                                price: record.price
                                            };
    
                                            obj.products.push(subObj);
                                        }
    
                                        allData.push(obj);
                                    }
                                }
                            } else {
                                for ( let d of monthDays) {
                                    d = d.toISOString().split('T')[0];
                                    
                                    let obj = {
                                        day: found[0].OrderDay.day,
                                        date: d,
                                        products: []
                                    };

                                    for (let record of found) {
                                        let subObj = {
                                            name: record.product,
                                            quantity: record.quantity,
                                            price: record.price
                                        };

                                        obj.products.push(subObj);
                                    }

                                    allData.push(obj);
                                   
                                }
                            }
                        }
                    }
                }
            }
            if (invoice.AdditionalOrderInvoice) {
                let foundDays = invoice.AdditionalOrderInvoice.AdditionalOrderDetail.map(x => x.OrderDay.id);
                foundDays = _.uniq(foundDays);

                for (let day of foundDays) {
                    let orderDay = 1;
                    if (day === 7) {
                        orderDay = 1;
                    } else {
                        orderDay = day + 1;
                    }

                    let found =  invoice.AdditionalOrderInvoice.AdditionalOrderDetail.filter(x => x.OrderDay.id === day);
                    // console.log(`Found === `, found);
                    if (found) {
                        //// checking valid from date
                        let deliveryDate = new Date(invoice.AdditionalOrderInvoice.deliveryDate);
                        let deliveryMonth = deliveryDate.getMonth();
                        let deliveryYear = deliveryDate.getFullYear();
                        
                        let monthYear = deliveryMonth + `-` + deliveryYear;

                        let date = new Date();
                        let currentMonth = date.getMonth();
                        let currentYear = date.getFullYear();
                        
                        let currentMonthYear = currentMonth + `-` + currentYear;

                        //// checking delivery is in current month
                        if (monthYear === currentMonthYear) {
                            let obj = {
                                day: found[0].OrderDay.day,
                                date: deliveryDate,
                                products: []
                            };
                            for (let detail of found) {
                                let subObj = {
                                    name: detail.product,
                                    quantity: detail.quantity,
                                    price: detail.price
                                };

                                obj.products.push(subObj);
                               
                            }
                            allData.push(obj);
                        }                   
                    }
                }
            }

            let invoiceName = 'invoice-' + invoice.invoiceNumber + '.pdf';
            const invoicePath = path.join('documents', 'invoices', invoiceName);
            // Create a document
            const pdfDoc = new PDFDocument();
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader(
            'Content-Disposition',
            'attachment; filename="' + invoiceName + '"'
            );
        
            // Generating pdf
            pdfDoc.pipe(fs.createWriteStream(invoicePath));
            pdfDoc.pipe(res);

            /// header
            pdfDoc.image('public/assets/images/header.png', 0, 0, {width: 615})
            /// footer
            pdfDoc.image('public/assets/images/foter.png', 0, 575, {width: 615})

            /// customer info
            pdfDoc.font('Times-Bold').fontSize(12).text(customer.fName + ` ` + customer.lName, 35, 170);
            pdfDoc.font('Times-Bold').fontSize(12).text(customer.houseStreetNumber, 35, 187);
            pdfDoc.font('Times-Bold').fontSize(12).text(customer.postalCode + ` ` + customer.town, 35, 204);

            /// bill date details
            pdfDoc.font('Times-Roman').fontSize(10).text('Date of Invoice:', 330, 170);
            pdfDoc.font('Times-Roman').fontSize(10).text(getFormattedDate(invoice.createdAt), 430, 170);

            pdfDoc.font('Times-Roman').fontSize(10).text('Customer Number:' , 330, 187);
            pdfDoc.font('Times-Roman').fontSize(10).text(`#` + customer.id, 430, 187);

            pdfDoc.font('Times-Roman').fontSize(10).text('Bill Number:', 330, 204);
            pdfDoc.font('Times-Roman').fontSize(10).text(`#`+ invoice.invoiceNumber, 430, 204);

            pdfDoc.font('Times-Roman').fontSize(10).text('Delivery Period:', 330, 221);
            pdfDoc.font('Times-Roman').fontSize(10).text(getFormattedDate(invoice.dateFrom) + ` - ` + getFormattedDate(invoice.dateTo), 430, 221);

            /// Message to customer
            pdfDoc.font('Times-Bold').fontSize(14).text('Dear Ms. / Mr. ' + customer.lName + `,`, 35, 260);
            pdfDoc.font('Times-Roman').fontSize(11).text('We thank you for the orders and provide you with the following delivers as agreed charged:', 35, 288);

            /// order detail
            // console.log(allData);
            let height = 0;
            let tableRowHeight = 0;
            for (let data of allData) {
                textInRowFirst(pdfDoc, data.day + `, ` + getFormattedDate(data.date), 320 + height);
                let rowWidth = 0;
                for (let product of data.products) {
                    textInRowSecond(pdfDoc, product.quantity + `x ` + product.name, rowWidth + 150, 320 + height);
                    rowWidth = rowWidth + 120;
                }
                // textInRowThird(pdfDoc, 'Some Text For 3', 320 + height);

                //// line under text
                createRow(pdfDoc, 335 + height);
                tableRowHeight = 335 + height;
                height = height + 20;
            }

            //// outro message
            pdfDoc.font('Times-Bold').fontSize(10).text('Please transfer the invoice amount to the one below', 35, tableRowHeight + 20);
            pdfDoc.font('Times-Bold').fontSize(10).text('within 7 days Bank Account', 35, tableRowHeight + 30);

            pdfDoc.font('Times-Italic').fontSize(10).text('Sincerely yours', 35, tableRowHeight + 50);
            pdfDoc.image('public/assets/images/i-logo.png', 35, tableRowHeight + 70, {width: 190});

            ////  amounts
            pdfDoc.font('Times-Roman').fontSize(11).text('Value of goods', 330, tableRowHeight + 40);
            pdfDoc.fontSize(11).text(invoice.amount + ' EUR', 470, tableRowHeight + 40, {
                align: 'right'
            });
            //// delivery charges
            pdfDoc.font('Times-Roman').fontSize(11).text('Delivery charges', 330, tableRowHeight + 60);
            pdfDoc.fontSize(11).text(invoice.deliveryCharges + ' EUR', 470, tableRowHeight + 60, { 
                align: 'right'
            });
            /// vat
            pdfDoc.font('Times-Roman').fontSize(11).text('Vat 5%', 330, tableRowHeight + 80);
            pdfDoc.fontSize(11).text('3.2 EUR', 470, tableRowHeight + 80, {
                align: 'right'
            });

            //// creating line
            createLine(pdfDoc, tableRowHeight + 95)

            /// Grand Total
            pdfDoc.font('Times-Bold').fontSize(11).text('GRAND TOTAL', 330, tableRowHeight + 105, {
            });
            pdfDoc.fontSize(11).text(invoice.totalAmount + ' EUR', 470, tableRowHeight + 105, {
                align: 'right'
            });

            // /// footer
            // pdfDoc.image('public/assets/images/foter.png', 0, 575, {width: 615})
        
            pdfDoc.end();
        })
}

function textInRowFirst(doc, text, heigth) {
    doc.y = heigth;
    doc.x = 35;
    doc.fillColor('black')
    doc.font('Times-Roman').fontSize(11).text(text, {
      paragraphGap: 5,
      indent: 5,
      align: 'justify',
      columns: 1,
    });
    return doc
}

function textInRowSecond(doc, text, width, heigth) {
    doc.y = heigth;
    doc.x = width;
    doc.fillColor('black')
    doc.font('Times-Roman').fontSize(11).text(text, {
      paragraphGap: 2,
      indent: 2,
      align: 'left',
      columns: 1,
    });
    return doc
}

function createRow(doc, heigth) {
    doc.lineWidth(0.3);
    doc.lineCap('butt')
        .moveTo(35, heigth)
        .lineTo(570, heigth)
        .stroke()
};

function createLine(doc, heigth) {
    doc.lineWidth(0.3);
    doc.lineCap('butt')
        .moveTo(330, heigth)
        .lineTo(530, heigth)
        .stroke()
}

function getFormattedDate(date) {
    date = new Date(date);
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return day + '.' + month + '.' + year;
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

const generateXML = function (req, res) {
    // console.log(req.query);

    // let query = req.query;
    // query.isDeleted = false;
  
    // return db.Invoice.findAll({ 
    //     where: query,
    //     order: [
    //         ['createdAt', 'DESC'],
    //     ],
    //     include: 
    //         [
    //             {
    //                 model: db.Customer,
    //                 as: `CustomerInvoice`,
    //                 attributes: [`id`, `fName`, `lName`, `email`, `postalCode`, `town`, `bankAccountOwner`, 'code', 'iban', 'paymentType'],
    //                 required: false,
    //             }
    //         ]
    // })
    //     .then((invoices) => {
    //         // convert mongoose document object to plain json object and return user
    //         invoices = JSON.parse(JSON.stringify(invoices));
    //         console.log(invoices);

    //         let billingInvoices = [];

    //         for (let invoice of invoices) {
    //             let findIndex = billingInvoices.findIndex(x => x.dateFrom == invoice.dateFrom && x.dateTo == invoice.dateTo);
    //             if (findIndex > -1) {
    //                 billingInvoices[findIndex].grossAmount = billingInvoices[findIndex].grossAmount + invoice.totalAmount;

    //                 if (invoice.CustomerInvoice.paymentType == 'Direct debit') {
    //                     billingInvoices[findIndex].sepaCustomers = billingInvoices[findIndex].sepaCustomers + 1;
    //                     billingInvoices[findIndex].sepaAmount = billingInvoices[findIndex].sepaAmount + invoice.totalAmount;
    //                 }
    //             } else {
    //                 let obj = {
    //                     id: invoice.id,
    //                     dateFrom: invoice.dateFrom,
    //                     dateTo: invoice.dateTo,
    //                     grossAmount: invoice.totalAmount,
    //                     sepaCustomers: 0,
    //                     sepaAmount: 0
    //                 };

    //                 if (invoice.CustomerInvoice.paymentType == 'Direct debit') {
    //                     obj.sepaCustomers = obj.sepaCustomers + 1;
    //                     obj.sepaAmount = obj.sepaAmount + invoice.totalAmount
    //                 }

    //                 billingInvoices.push(obj);
    //             }
    //         }
    //         return billingInvoices
    //     })
    //     .then(billingInvoices => {
    //         /// vat & net
    //         for (let invoice of billingInvoices) {
    //             let vat = 0;
    //             let net = 0;

    //             net = invoice.grossAmount/1.07;
    //             vat = invoice.grossAmount - net;

    //             invoice.net = Number(net.toFixed(3));
    //             invoice.vat = Number(vat.toFixed(3));
    //             invoice.grossAmount = Number(invoice.grossAmount.toFixed(3));
    //             invoice.sepaAmount = Number(invoice.sepaAmount.toFixed(3))
    //         }
    //     })

    //// generating XML
    var doc = new SEPA.Document('pain.001.001.03');
    doc.grpHdr.id = "XMPL.20140201.TR0";
    doc.grpHdr.created = new Date();
    doc.grpHdr.initiatorName = "EXPRESS BRÖTCHEN DE";
    
    var info = doc.createPaymentInfo();
    info.requestedExecutionDate = new Date();
    info.debtorIBAN = "DE15700520600022425508";
    info.debtorBIC = "BYLADEM1LLD";
    info.debtorName = "EXPRESS BRÖTCHEN DE";
    info.debtorId = "DE88ZZZ00001794340";
    doc.addPaymentInfo(info);
    
    var tx = info.createTransaction();
    tx.creditorName = "Example Customer";
    tx.creditorIBAN = "DE40987654329876543210";
    tx.creditorBIC = "CUSTDEM0XXX";
    tx.mandateId = "XMPL.CUST487.2014";
    tx.mandateSignatureDate = new Date("2014-02-01");
    tx.amount = 50.23;
    tx.remittanceInfo = "INVOICE 54";
    tx.end2endId = "XMPL.CUST487.INVOICE.54";
    info.addTransaction(tx);


    var xmldoc = doc.toString();

    const xmlPath = path.join('documents', 'xml', 'test.xml');

    fs.writeFile(xmlPath, xmldoc, function(err) {
        if(err) { return console.log(err); } 
           console.log("The file was saved!");    
        });

        const file = fs.readFile(xmlPath, (err, data) => {
        if (err) {
            return error;
        } 
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
        'Content-Disposition',
        'attachment; filename="' + 'test.xml' + '"'
        );

        res.send(data);
    });
}

module.exports = {
    create,
    get,
    getPDF,
    PDFTest,
    updateInvoice,
    sendEmail,
    getInvoicesForBilling,
    generateXML
}