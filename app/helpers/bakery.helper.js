'use strict'

const _ = require('lodash')
const SERVER_RESPONSE = require('../config/serverResponses')
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')

////get all categories
function getBakery(input) {
    return db.Bakery.findOne({
        where: input,
    })
}

////// to edit the category
function updateBakery(data) {
    let userId = data.UserId;
    return db.Bakery.findOne({ where: {UserId: userId}})
    .then( async (charge) => {
        if (_.isEmpty(charge)) {
            // charge not found, return error
            let newCharge = db.Bakery.build(data);
            return newCharge.save();
        }

        return db.Bakery.update(
            data,
            { where: { UserId: userId } }
        )
    })
}

module.exports = {
    getBakery,
    updateBakery
}