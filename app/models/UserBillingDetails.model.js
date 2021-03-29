'use strict'

let crypto = require('crypto')

module.exports = function (sequelize, DataTypes) {
  let UserBillingDetails = sequelize.define('UserBillingDetails',
    {
        surname: {
            type: DataTypes.STRING(100)
        },
        phone: {
            type: DataTypes.STRING(20)
        },
        fax: {
            type: DataTypes.STRING(20)
        },
        email: {
            type: DataTypes.STRING(100),
            isEmail: true,
        },
        url: {
            type: DataTypes.STRING(100)
        },
        orderFax1: {
            type: DataTypes.STRING(20)
        },
        orderFax2: {
            type: DataTypes.STRING(20)
        },
        emailSignature: {
            type: DataTypes.STRING(200)
        },
        paymentNewCustomer: {
            type: DataTypes.STRING(100)
        },
        exemptVAT: {
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
        UserBillingDetails.belongsTo(models.User, {
            as: 'UserBillingDetails',
            foreignKey: 'UserId'
        })
        UserBillingDetails.belongsTo(models.Partner, {
            as: 'PartnerBillingDetails',
            foreignKey: 'PartnerId'
        })
      }
    }
  )

  return UserBillingDetails
}
