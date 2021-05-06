'use strict'

const _ = require('lodash')
const SERVER_RESPONSE = require('../config/serverResponses')
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')

////get all categories
function getDeliveryCharges(input) {
    return db.DeliveryCharges.findOne({
        where: input,
    })
}

////// to edit the category
function updateCharges(data) {
    let userId = data.UserId;
    return db.DeliveryCharges.findOne({ where: {UserId: userId}})
    .then( async (charge) => {
        if (_.isEmpty(charge)) {
            // charge not found, return error
            let newCharge = db.DeliveryCharges.build(data);
            return newCharge.save();
        }

        return db.DeliveryCharges.update(
            data,
            { where: { UserId: userId } }
        )
    })
}

module.exports = {
    getDeliveryCharges,
    updateCharges
}