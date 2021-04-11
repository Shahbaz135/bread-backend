'use strict'
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')
const _ = require('lodash')
const SERVER_RESPONSE = require('../config/serverResponses')

///// add new delivery area
function addDeliveryArea(data) {

    return db.DeliveryArea.create(data)
      .then(async (insertedArea) => {
  
        // adding week days
        let regularDayIds = data.regularDaysId;
        let sampleDayIds = data.sampleDaysId;

        const regularDeliveryDays = []
        const sampleDeliveryDays = []

        for (let i = 0; i < regularDayIds.length; i++) {
          regularDeliveryDays.push({
            DeliveryAreaId: insertedArea.id,
            WeekDaysId: regularDayIds[i]
          })
        }
        for (let i = 0; i < sampleDayIds.length; i++) {
          sampleDeliveryDays.push({
            DeliveryAreaId: insertedArea.id,
            WeekDaysId: sampleDayIds[i]
          })
        }

        db.RegularDeliveryDays.bulkCreate(regularDeliveryDays)
        db.SampleDeliveryDays.bulkCreate(sampleDeliveryDays)
        return insertedArea.save()
      })
      .catch(generalHelpingMethods.catchException)
}


///// to get all delivery areas
function deliveryAreasList(input) {
  let query = input;
  query.isDeleted = false;

  return db.DeliveryArea.findAll({ 
    where: query,
    order: [
      ['createdAt', 'DESC'],
    ],
    include:
      [
        {
          model: db.WeekDays,
          as: `regularDeliveryDay`,
          attributes: [`id`, `day`],
          through: {attributes: []},
          required: false,
        },
        {
          model: db.WeekDays,
          as: `sampleDeliveryDay`,
          attributes: [`id`, `day`],
          through: {attributes: []},
          required: false,
        }
      ] 
  })
    .then((deliveryArea) => {
      // convert mongoose document object to plain json object and return user
      return deliveryArea
    })
}

//// to update delivery area
const updateDeliveryArea = (data, id) => {
  return db.DeliveryArea.findOne({
    where: {
      id: id,
      isDeleted: false
    }
  })
    .then((deliveryArea) => {
      if (_.isEmpty(deliveryArea)) {
        // Product not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1572,
          message: 'Delivery Area not found.'
        }])
      }
      // Update product
      deliveryArea.set(data)
      return deliveryArea.save()
        .then(async insertedArea => {
          //// first deleting previous order details
          await db.RegularDeliveryDays.destroy({
            where: {
              DeliveryAreaId: id
            }
          })

          await db.SampleDeliveryDays.destroy({
            where: {
              DeliveryAreaId: id
            }
          })

          // adding week days
          let regularDayIds = data.regularDaysId;
          let sampleDayIds = data.sampleDaysId;

          const regularDeliveryDays = []
          const sampleDeliveryDays = []

          for (let i = 0; i < regularDayIds.length; i++) {
            regularDeliveryDays.push({
              DeliveryAreaId: insertedArea.id,
              WeekDaysId: regularDayIds[i]
            })
          }
          for (let i = 0; i < sampleDayIds.length; i++) {
            sampleDeliveryDays.push({
              DeliveryAreaId: insertedArea.id,
              WeekDaysId: sampleDayIds[i]
            })
          }

          db.RegularDeliveryDays.bulkCreate(regularDeliveryDays)
          db.SampleDeliveryDays.bulkCreate(sampleDeliveryDays)
          return insertedArea.save()
        })
    })
}

const deleteDeliveryArea = (input) => {
  return db.DeliveryArea.findOne({
    where: {
      id: input.id,
      isDeleted: false
    }
  })
    .then((area) => {
      if (_.isEmpty(area)) {
        // Employee not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1575,
          message: 'No delivery area found against given id.'
        }])
      }
      // employee found, change value of isDeleted to true
      area.isDeleted = true
      // save employee
      area.save()
      return true
    })
}


module.exports = {
    addDeliveryArea,
    deliveryAreasList,
    updateDeliveryArea,
    deleteDeliveryArea
  }