'use strict'

let crypto = require('crypto')

module.exports = function (sequelize, DataTypes) {
  let TourPlanning = sequelize.define('TourPlanning',
    {
        description: {
            type: DataTypes.STRING(100)
        },
        label: {
            type: DataTypes.STRING(100)
        },
        name: {
            type: DataTypes.STRING(100)
        },
        billingMode: {
            type: DataTypes.STRING(100)
        },
        fieldTour: {
            type: DataTypes.BOOLEAN,
        },
        supportTour: {
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
        TourPlanning.belongsTo(models.User, {
            as: 'CreatedByUser',
            foreignKey: 'UserId'
        })
        TourPlanning.belongsTo(models.Partner, {
            as: 'CreatedByPartner',
            foreignKey: 'PartnerId'
        })
        TourPlanning.belongsToMany(models.WeekDays, {
            through: 'TourDays',
            as: 'tourDays',
            foreignKey: 'TourPlanningId'
        })
        TourPlanning.belongsToMany(models.User, {
            through: 'TourUsers',
            as: 'tourUsers',
            foreignKey: 'TourPlanningId'
        })
        TourPlanning.hasMany(models.Customer, { 
            foreignKey: 'TourPlanningId', 
            as: 'TourCustomer' 
        })
      }
    }
  )

  return TourPlanning
}
