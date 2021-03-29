'use strict'

let crypto = require('crypto')

module.exports = function(sequelize, DataTypes) {
    let Partner = sequelize.define('Partner',
        {
            name: {
                type: DataTypes.STRING(100),
                require: true
            },
            email: {
                type: DataTypes.STRING(100),
                isEmail: true,
                unique: true
            },
            password: DataTypes.STRING,
            salt: DataTypes.STRING,
            image: {
                type: DataTypes.STRING(100),
                require: true
            },
            phone: {
                type: DataTypes.STRING(15),
                require: true,
                unique: true
            },
            postalCode: {
                type: DataTypes.INTEGER,
                require: true
            },
            houseStreetNumber: {
                type: DataTypes.STRING(100),
                require: true,
            },
            town: {
                type: DataTypes.STRING
            },
            iban: {
                type: DataTypes.STRING,
                require: true
            },
            isVerified: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        }, {
            associate: function (models) {
                Partner.hasMany(models.Customer, {
                    as: 'PartnerCustomers',
                    foreignKey: 'PartnerId'
                })
                Partner.hasMany(models.Category, {
                    as: 'PartnerCategory',
                    foreignKey: 'PartnerId'
                })
                Partner.hasMany(models.Product, {
                    as: 'PartnerProduct',
                    foreignKey: 'PartnerId'
                })
                Partner.hasMany(models.Order, { 
                    foreignKey: 'PartnerId',
                    as: 'PartnerOrders'
                })
                Partner.hasMany(models.Bakery, { 
                    foreignKey: 'PartnerId',
                    as: 'PartnerBakery'
                })
                Partner.hasMany(models.DeliveryCharges, { 
                    foreignKey: 'PartnerId',
                    as: 'PartnerDeliveryCharges'
                })
                Partner.hasMany(models.UserBankDetails, { 
                    foreignKey: 'PartnerId',
                    as: 'PartnerBankDetails'
                })
                Partner.hasMany(models.UserBillingDetails, { 
                    foreignKey: 'PartnerId',
                    as: 'PartnerBillingDetails'
                })
                Partner.hasMany(models.UserPaymentOptions, { 
                    foreignKey: 'PartnerId',
                    as: 'PartnerPaymentOption'
                })
                Partner.hasMany(models.TourPlanning, { 
                    foreignKey: 'PartnerId',
                    as: 'CreatedByPartner'
                })
            }
        }
    )

    Partner.prototype.makeSalt = function () {
        return crypto.randomBytes(16).toString('base64');
    }

    Partner.prototype.authenticate = function (plainText) {
        return this.encryptPassword(plainText, this.salt).toString() === this.password.toString()
    }

    Partner.prototype.encryptPassword = function (password, salt) {
        if (!password || !salt) {
          return ''
        }
        salt = new Buffer.from(salt, 'base64')
        return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64')
    }

    return Partner
}