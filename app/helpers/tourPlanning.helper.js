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
            if (weekDayIds.length) {
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
            if (weekDayIds.length) {
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
function getTours(input) {
    let query = input;
    let weekDayQuery = {};
    if (input.WeekDayIds.length > 0) {
        weekDayQuery.WeekDaysId = input.WeekDayIds.length;
    }

    query.isDeleted = false;
  
    return db.TourPlanning.findAll({ 
        where: query,
        order: [
            ['createdAt', 'DESC'],
        ],
        attributes: [`id`, `description`, `label`, `name`, `billingMode`, `receptionTour`, `supportTour`],
        include:
            [
                {
                    model: db.WeekDays,
                    as: `tourDays`,
                    where: weekDayQuery,
                    attributes: [`id`, `day`],
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

module.exports = {
    createTour,
    getTours
}