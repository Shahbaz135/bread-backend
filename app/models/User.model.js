'use strict'

let crypto = require('crypto')

module.exports = function (sequelize, DataTypes) {
  let User = sequelize.define('User',
    {
      fName : {
        type: DataTypes.STRING(100),
      },
      lName : {
        type: DataTypes.STRING(100),
      },
      email: {
        type: DataTypes.STRING(100),
        isEmail: true,
      },
     // imageUrl: DataTypes.STRING,
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
      furtherAddress: {
        type: DataTypes.STRING(100),
      },
      town: {
        type: DataTypes.STRING
      },
      // roles: {
      //   type: []
      // },
      otp: DataTypes.STRING(5),
      otpValidTill: DataTypes.DATE,
     // language: DataTypes.STRING(3),
     // balance: DataTypes.DECIMAL(10, 2),
      password: DataTypes.STRING,
      salt: DataTypes.STRING,
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isBlocked: {
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
        User.belongsTo(models.Role)
        User.hasMany(models.Bakery, {
          foreignKey: 'UserId', 
          as: 'UserBakery' 
        })
        User.hasMany(models.DeliveryCharges, {
          foreignKey: 'UserId', 
          as: 'UserDeliveryCharges' 
        })
        User.hasMany(models.UserBankDetails, {
          foreignKey: 'UserId', 
          as: 'UserBankDetails' 
        })
        User.hasMany(models.UserBillingDetails, {
          foreignKey: 'UserId', 
          as: 'UserBillingDetails' 
        })
        User.hasMany(models.UserPaymentOptions, {
          foreignKey: 'UserId', 
          as: 'UserPaymentOption' 
        })
        User.hasMany(models.TourPlanning, {
          foreignKey: 'UserId', 
          as: 'CreatedByUser' 
        })
        User.belongsToMany(models.TourPlanning, {
          through: 'TourUsers',
          as: 'tourUsers',
          foreignKey: 'UserId'
      })
      }
      
    }
  )

  User.prototype.toJSON = function () {
    var values = this.get()
    delete values.hashedPassword
    delete values.salt
    delete values.otp
    delete values.otpValidTill
    delete values.balance
    return values
  }

  User.prototype.makeSalt = function () {
    return crypto.randomBytes(16).toString('base64')
  }

  User.prototype.authenticate = function (plainText) {
    return this.encryptPassword(plainText, this.salt).toString() === this.password.toString()
  }

  User.prototype.encryptPassword = function (password, salt) {
    if (!password || !salt) {
      return ''
    }
    salt = new Buffer.from(salt, 'base64')
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64')
  }

  return User
}
