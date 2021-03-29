'use strict'

let crypto = require('crypto')

module.exports = function (sequelize, DataTypes) {
  let DeliveryCharges = sequelize.define('DeliveryCharges',
    {
      workingDays: {
        type: DataTypes.FLOAT
      },
      saturday: {
        type: DataTypes.FLOAT
      },
      sunday: {
        type: DataTypes.FLOAT
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }
    ,
    {
      associate: function (models) {
        DeliveryCharges.belongsTo(models.User, {
            as: 'UserDeliveryCharges',
            foreignKey: 'UserId'
        })
        DeliveryCharges.belongsTo(models.Partner, {
            as: 'PartnerDeliveryCharges',
            foreignKey: 'PartnerId'
        })
      }
    }
  )

  return DeliveryCharges
}
