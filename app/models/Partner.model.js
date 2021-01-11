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
            address: {
                type: DataTypes.STRING(100),
                require: true,
            },
            isVerified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            creationTime: {
                type: DataTypes.DATE,
                defaultValue: Date.now()
            }
        }
    )

    return Partner
}