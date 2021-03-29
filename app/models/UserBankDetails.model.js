'use strict'

let crypto = require('crypto')

module.exports = function (sequelize, DataTypes) {
  let UserBankDetails = sequelize.define('UserBankDetails',
    {
        accountOwner: {
            type: DataTypes.STRING(100)
        },
        bankName: {
            type: DataTypes.STRING(100)
        },
        bankCode: {
            type: DataTypes.STRING(100)
        },
        bankAccountNumber: {
            type: DataTypes.STRING(100)
        },
        accountType: {
            type: DataTypes.STRING(100)
        },
        iban: {
            type: DataTypes.STRING(100)
        },
        bic: {
            type: DataTypes.STRING(100)
        },
        creditorId: {
            type: DataTypes.STRING(100)
        },
        usage: {
            type: DataTypes.STRING(200)
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
        UserBankDetails.belongsTo(models.User, {
            as: 'UserBankDetails',
            foreignKey: 'UserId'
        })
        UserBankDetails.belongsTo(models.Partner, {
            as: 'PartnerBankDetails',
            foreignKey: 'PartnerId'
        })
      }
    }
  )

  return UserBankDetails
}
