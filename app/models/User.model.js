'use strict'

let crypto = require('crypto')

module.exports = function (sequelize, DataTypes) {
  let User = sequelize.define('User',
    {
      Name: {
        type: DataTypes.STRING(100),
        require: true
      },
      email: {
        type: DataTypes.STRING(100),
        isEmail: true,
        unique: true
      },
     // imageUrl: DataTypes.STRING,
      phone: {
        type: DataTypes.STRING(15),
        require: true,
        unique: true
      },
      landphone: {
        type: DataTypes.STRING(15),
      },
      country: {
        type: DataTypes.STRING(15),
        require: true,
      },
      city: {
        type: DataTypes.STRING(15),
        require: true,
      },
      user_type: {
        type: DataTypes.STRING(15),
        require: true,
      },
      // roles: {
      //   type: []
      // },
      otp: DataTypes.STRING(5),
      otpValidTill: DataTypes.DATE,
     // language: DataTypes.STRING(3),
     // balance: DataTypes.DECIMAL(10, 2),
      hashedPassword: DataTypes.STRING,
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
        // User.hasOne(models.Publisher, { foreignKey: 'UserId', as: 'relatedUser' })
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
    return this.encryptPassword(plainText, this.salt).toString() === this.hashedPassword.toString()
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
