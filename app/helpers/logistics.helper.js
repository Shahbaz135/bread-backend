'use strict'

const _ = require('lodash')
const SERVER_RESPONSE = require('../config/serverResponses')
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')

////get all get order supplier
function getOrderSupplier(input) {
    let fromDate = input.fromDate;
    let toDate = input.toDate;
    let data = [];

    return new Promise((resolve, reject) => {
        let dateArray = getDatesRange(fromDate, toDate);

        for (let date of dateArray) {
            var currentDay;
            date = new Date(date);

            let day = date.getDay();

            if (day == 0) {
                currentDay = `Sunday`
            } else if (day == 1) {
                currentDay = `Monday`
            } else if (day == 2) {
                currentDay = `Tuesday`
            } else if (day == 3) {
                currentDay = `Wednesday`
            } else if (day == 4) {
                currentDay = `Thursday`
            } else if (day == 5) {
                currentDay = `Friday`
            } else if (day == 6) {
                currentDay = `Saturday`
            }

            let obj = {
                date: date,
                week: weekOfYear(date),
                day: currentDay
            };

            data.push(obj);
        }

        resolve(data);
    })
}

function getDeliveryList(input) {
}

function getDatesRange(start, end) {
    start = new Date(start);
    end = new Date(end);
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
};

function weekOfYear (date){
    var d = new Date(+date);
    d.setHours(0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};

module.exports = {
    getOrderSupplier,
    getDeliveryList
}