'use strict'

const _ = require('lodash')
const db = require('../config/sequelize.config')

////get all categories
function getBakery(input) {
    return db.Bakery.findOne({
        where: input,
    })
}

module.exports = {
    getBakery
}