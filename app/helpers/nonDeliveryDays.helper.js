'use strict'

const _ = require('lodash')
const SERVER_RESPONSE = require('../config/serverResponses')
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')
const helpingHelperMethods = require('./helping.helper')

///// creating new day
function addDay(input) {
  return db.NonDeliveryDay.create(input)
    .then(async (insertedDay) => {
      return await insertedDay.save()
    })
    .catch(generalHelpingMethods.catchException)
}

///// to get all partners
function getAllDays(query) {
  
    return db.NonDeliveryDay.findAll({
      where: query,
      order: [
        ['createdAt', 'DESC'],
      ]
    })
}

//// to delete day
const deleteDay = (input) => {
    return db.NonDeliveryDay.findOne({
      where: {
        id: input.id,
        isDeleted: false
      }
    })
      .then((day) => {
        if (_.isEmpty(day)) {
          // Employee not found, return error
          return generalHelpingMethods.rejectPromise([{
            field: 'id',
            error: 1575,
            message: 'No Day found against given id.'
          }])
        }
        // employee found, change value of isDeleted to true
        day.isDeleted = true
        // save employee
        day.save()
        return true
    })
}

module.exports = {
    addDay,
    getAllDays,
    deleteDay
}