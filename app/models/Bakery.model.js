'use strict'

let crypto = require('crypto')

module.exports = function (sequelize, DataTypes) {
  let Bakery = sequelize.define('Bakery',
    {
      name : {
        type: DataTypes.STRING(100),
      },
      email: {
        type: DataTypes.STRING(100),
        isEmail: true,
      },
      phone: {
        type: DataTypes.STRING(15),
      },
      mobileNumber: {
        type: DataTypes.STRING(20),
      },
      fax: {
        type: DataTypes.STRING(20),
      },
      postalCode: {
        type: DataTypes.INTEGER
      },
      houseStreetNumber: {
        type: DataTypes.STRING(100),
      },
      town: {
        type: DataTypes.STRING
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }
    ,
    {
      associate: function (models) {
        Bakery.belongsTo(models.User, {
            as: 'UserBakery',
            foreignKey: 'UserId'
        })
        Bakery.belongsTo(models.Partner, {
            as: 'PartnerBakery',
            foreignKey: 'PartnerId'
        })
      }
    }
  )

  return Bakery
}
