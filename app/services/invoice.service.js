'use strict'

const _ = require('lodash')
const SERVER_RESPONSE = require('../config/serverResponses')
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('../helpers/general.helper')

exports.initiateInvoice = (data) => {
    let query = {
        isDeleted: false,
        isActive: true
    };
  // query.isActive = true;

    return db.Customer.findAll({ 
        where: query,
        attributes: { exclude: ['password', 'salt']},
        include:
        [
            {
                model: db.AdditionalOrder,
                as: `CustomerAdditionalOrders`,
                where: query,
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
                where: query,
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
                    let totalAmount = 0;

                    for (let day of foundDays) {
                        let orderDay = 1;
                        if (day === 7) {
                            orderDay = 1;
                        } else {
                            orderDay = day + 1;
                        }
        
                        let found = order.OrderDetail.filter(x => x.OrderDay.id === day);
                        let countDay;
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
                                // console.log(`Month Days === `, monthDays);
                                
                                let finalDays = [];
                                for ( let d of monthDays) {
                                    d = d.toISOString().split('T')[0];
                                    if (d >= validFromDate && d <= expiryDate) {
                                        finalDays.push(d);
                                    }
                                }
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
                                    countDay = finalDays.length;
                                } else {
                                    countDay = getAllDaysInMonth(currentYear, currentMonth+1, orderDay).length;
                                }
                            }

                            for (let detail of found) {
                                let total = Number(detail.price) * Number(detail.quantity) * Number(countDay);
                                totalAmount = totalAmount + total;
                            }
                        }
                    }

                    totalAmount = Number(totalAmount.toFixed(3));

                    let deliveryCharges = order.deliveryCharges;
                    let grandTotal = totalAmount + deliveryCharges;

                    /// getting current month date
                    let date = new Date();
                    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

                    let data = {
                        amount: totalAmount,
                        deliveryCharges: deliveryCharges,
                        totalAmount: grandTotal,
                        CustomerId: customer.id,
                        OrderId: order.id,
                        PartnerId: customer.PartnerId,
                        dateFrom: firstDay,
                        dateTo: lastDay
                    }

                    if (totalAmount > 0) {
                        /// checking existing invoice
                    checkExistingInvoice(data)
                        .then(exist => {
                            if (!exist) {
                                createInvoice(data);
                            }
                        })
                    }
                    
                }
            }
            if (customer.CustomerAdditionalOrders.length > 0) {
                for (let order of customer.CustomerAdditionalOrders) {
                    
                    let foundDays = order.AdditionalOrderDetail.map(x => x.OrderDay.id);
                    foundDays = _.uniq(foundDays);
                    let totalAmount = 0;

                    for (let day of foundDays) {
                        let orderDay = 1;
                        if (day === 7) {
                            orderDay = 1;
                        } else {
                            orderDay = day + 1;
                        }
        
                        let found = order.AdditionalOrderDetail.filter(x => x.OrderDay.id === day);

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
                                    let total = Number(detail.price) * Number(detail.quantity) ;
                                    totalAmount = totalAmount + total;
                                }
                            }                   
                        }
                    }

                    totalAmount = Number(totalAmount.toFixed(2));

                    let deliveryCharges = order.deliveryCharges;
                    let grandTotal = totalAmount + deliveryCharges;

                    /// getting current month date
                    let date = new Date();
                    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

                    let data = {
                        amount: totalAmount,
                        deliveryCharges: deliveryCharges,
                        totalAmount: grandTotal,
                        CustomerId: customer.id,
                        AdditionalOrderId: order.id,
                        PartnerId: customer.PartnerId,
                        dateFrom: firstDay,
                        dateTo: lastDay
                    }

                    if (totalAmount > 0) {
                        /// checking existing invoice
                    checkExistingInvoice(data)
                        .then(exist => {
                            if (!exist) {
                                createInvoice(data);
                            }
                        })
                    }
                    
                }
            }
        }
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

async function createInvoice (data) {
    let invoiceNumber;

    /// check if number already exist
    let isExist = true;
    while(isExist) {
        invoiceNumber = Math.round(Math.random() * 9000 + 100000);
        isExist = await checkNumber(invoiceNumber);
    }

    data.invoiceNumber = invoiceNumber;

    let newInvoice = db.Invoice.build(data);
    let result =await newInvoice.save()
    if (result) {
        console.log(`Invoice created--- `);
    }
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

async function checkExistingInvoice(data) {
    return new Promise(async (resolve, reject) => {
        let query = {
            CustomerId: data.CustomerId
        };

        if (data.OrderId) {
            query.OrderId = data.OrderId;
        } else if (data.AdditionalOrderId) {
            query.AdditionalOrderId = data.AdditionalOrderId;
        }
    
        await db.Invoice.findAll({ 
            where: query,
            order: [
                ['createdAt', 'DESC'],
            ], 
        })
            .then((invoice) => {
               
                if (_.isEmpty(invoice)) {
                   resolve(false);
                } else {
                    let date = new Date();
                    date = date.getFullYear() + `-` + date.getMonth();
                    let invoiceDate = new Date(invoice[0].createdAt);
                    invoiceDate = invoiceDate.getFullYear() + `-` + invoiceDate.getMonth();

                    if (date == invoiceDate) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            })
        })
}