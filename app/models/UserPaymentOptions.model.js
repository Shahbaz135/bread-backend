'use strict'

let crypto = require('crypto')

module.exports = function (sequelize, DataTypes) {
  let UserPaymentOptions = sequelize.define('UserPaymentOptions',
    {
        paymentType: {
            type: DataTypes.STRING(100)
        },
        cashPayment: {
            type: DataTypes.BOOLEAN,
        },
        directDebt: {
            type: DataTypes.BOOLEAN,
        },
        transfer: {
            type: DataTypes.BOOLEAN,
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
        UserPaymentOptions.belongsTo(models.User, {
            as: 'UserPaymentOption',
            foreignKey: 'UserId'
        })
        UserPaymentOptions.belongsTo(models.Partner, {
            as: 'PartnerPaymentOption',
            foreignKey: 'PartnerId'
        })
      }
    }
  )

  return UserPaymentOptions
}
