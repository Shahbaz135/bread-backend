'use strict'

const _ = require('lodash')
const SERVER_RESPONSE = require('../config/serverResponses')
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')
const helpingHelperMethods = require('./helping.helper')

//// to create new order
async function createTour(data) {
    let newTour = db.TourPlanning.build(data);
    return newTour.save()
        .then(async tour => {
            let weekDayIds = data.WeekDayIds;
            let userIds = data.UserIds;

            tour = tour.toJSON();
            
            //// saving data to tour days
            if (weekDayIds && weekDayIds.length) {
                for (let dayId of weekDayIds) {
                    let obj = {
                        TourPlanningId: tour.id,
                        WeekDaysId: dayId
                    };

                    let tourDays = db.TourDays.build(obj)
                    await tourDays.save();
                }
            }

            //// saving data to tour user
            if (userIds && userIds.length) {
                for (let userId of userIds) {
                    let obj = {
                        TourPlanningId: tour.id,
                        UserId: userId
                    };

                    let tourUsers = db.TourUsers.build(obj)
                    await tourUsers.save();
                }
            }
        })
        .catch(generalHelpingMethods.catchException)
}

///// to get orders
function getTours(input, daysQuery) {
    let query = input;
    let weekDayQuery = daysQuery;
    let userIdQuery = {};
    // console.log(weekDayQuery)

    if (input.UserIds && input.UserIds.length > 0) {
        userIdQuery.UserIds = input.UserIds;
    }

    query.isDeleted = false;
  
    return db.TourPlanning.findAll({ 
        where: query,
        order: [
            ['createdAt', 'DESC'],
        ],
        attributes: [`id`, `description`, `label`, `name`, `billingMode`, `fieldTour`, `supportTour`],
        include:
            [
                {
                    model: db.WeekDays,
                    as: `tourDays`,
                    where: weekDayQuery,
                    attributes: [`id`, `day`],
                    through: {attributes: []},
                    required: true,
                },
                {
                    model: db.User,
                    as: `tourUsers`,
                    where: userIdQuery,
                    attributes: [`id`],
                    through: {attributes: []},
                    required: false,
                }
            ]
    })
        .then((tours) => {
            // convert mongoose document object to plain json object and return user
            return JSON.parse(JSON.stringify(tours))
        })
}

///// to change/update tour
const updateTour = (data, id) => {
    return db.TourPlanning.findOne({
      where: {
        id: id,
        isDeleted: false
      }
    })
        .then((tour) => {
        if (_.isEmpty(tour)) {
            // Product not found, return error
            return generalHelpingMethods.rejectPromise([{
            field: 'id',
            error: 1572,
            message: 'Tour not found.'
            }])
        }
        // Update tour
        tour.set(data)
        return tour.save()
            .then(async detail => {
                //// first deleting previous details
                await db.TourDays.destroy({
                    where: {
                        TourPlanningId: id
                    }
                })

                let tourDays = data.weekDayIds;
                detail = detail.toJSON();
                
                // //// saving data to customer order
                if (tourDays.length) {
                    for (let day of tourDays) {
                        let obj = {
                            TourPlanningId: id,
                            WeekDaysId: day
                        };

                        let newDays = db.TourDays.build(obj)
                        await newDays.save();
                    }
                }

                /// now doing this again for tour users
                await db.TourUsers.destroy({
                    where: {
                        TourPlanningId: id
                    }
                })

                let userIds = data.userIds;
                
                // //// saving data to customer order
                if (userIds.length) {
                    for (let user of userIds) {
                        let obj = {
                            TourPlanningId: id,
                            UserId: user
                        };

                        let newTourUser = db.TourUsers.build(obj)
                        await newTourUser.save();
                    }
                }
            })
            
        })
}

//// to delete order
const deleteTour = (input) => {
    return db.TourPlanning.findOne({
      where: {
        id: input.id,
        isDeleted: false
      }
    })
      .then((tour) => {
        if (_.isEmpty(tour)) {
          // Employee not found, return error
          return generalHelpingMethods.rejectPromise([{
            field: 'id',
            error: 1575,
            message: 'No tour found against given id.'
          }])
        }
        // employee found, change value of isDeleted to true
        tour.isDeleted = true
        // save employee
        tour.save()
        return true
    })
}

module.exports = {
    createTour,
    getTours,
    updateTour,
    deleteTour
}