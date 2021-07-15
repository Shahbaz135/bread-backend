'use strict'

const _ = require('lodash')
const SERVER_RESPONSE = require('../config/serverResponses')
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')

////get all categories
function getBankDetail(input) {
    return db.UserBankDetails.findAll({
        where: input,
    })
}

////// to edit the category
function updateBankDetail(data) {
    return db.UserBankDetails.findOne({ where: {accountType: data.accountType}})
    .then( async (charge) => {
        if (_.isEmpty(charge)) {
            // charge not found, return error
            let newCharge = db.UserBankDetails.build(data);
            return newCharge.save();
        }

        return db.UserBankDetails.update(
            data,
            { where: { accountType: data.accountType } }
        )
    })
}

module.exports = {
    getBankDetail,
    updateBankDetail
}