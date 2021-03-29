'use strict'

let crypto = require('crypto')

module.exports = function(sequelize, DataTypes) {
    let Customer = sequelize.define('Customer',
        {
            fName : {
                type: DataTypes.STRING(100),
                require: true
            },
            lName : {
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
            phone: {
                type: DataTypes.STRING(15),
                require: true,
                unique: true
            },
            postalCode: {
                type: DataTypes.INTEGER
            },
            houseStreetNumber: {
                type: DataTypes.STRING(100),
                require: true,
            },
            town: {
                type: DataTypes.STRING
            },
            iban: {
                type: DataTypes.STRING
            },
            company: {
                type: DataTypes.STRING
            },
            birthDay: {
                type: DataTypes.STRING
            },
            deliverNotes: {
                type: DataTypes.STRING
            },
            recommendationOf: {
                type: DataTypes.STRING
            },
            isTrail: {
                type: DataTypes.BOOLEAN,
                require: true
            },
            isWeb: {
                type: DataTypes.BOOLEAN,
                require: true
            },
            desiredDate: {
                type: DataTypes.DATE,
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
                Customer.belongsTo(models.Partner, {
                    as: 'PartnerCustomers',
                    foreignKey: 'PartnerId'
                })
                Customer.hasMany(models.Order, { 
                    foreignKey: 'CustomerId', 
                    as: 'CustomerOrders' 
                })
                Customer.belongsTo(models.TourPlanning, {
                    as: 'TourCustomer',
                    foreignKey: 'TourPlanningId'
                })
            }
        }
    )

    Customer.prototype.makeSalt = function () {
        return crypto.randomBytes(16).toString('base64');
    }

    Customer.prototype.authenticate = function (plainText) {
        return this.encryptPassword(plainText, this.salt).toString() === this.password.toString()
    }

    Customer.prototype.encryptPassword = function (password, salt) {
        if (!password || !salt) {
          return ''
        }
        salt = new Buffer.from(salt, 'base64')
        return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64')
    }

    return Customer
}