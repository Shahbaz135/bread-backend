'use strict'

module.exports = function (sequelize, DataTypes) {
  let WeekDays = sequelize.define('WeekDays',
    {
      day: {
        type: DataTypes.STRING(100),
        require: true
      },
      isActive: {
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
        WeekDays.belongsToMany(models.Category, {
            through: 'CategoryDay',
            as: 'categoryDays',
            foreignKey: 'WeekDaysId'
        })

        WeekDays.belongsToMany(models.Product, {
            through: 'ProductDay',
            as: 'productWeekDays',
            foreignKey: 'WeekDaysId'
        })

        WeekDays.belongsToMany(models.DeliveryArea, {
          through: 'RegularDeliveryDays',
          as: 'regularDeliveryDay',
          foreignKey: 'WeekDaysId'
        })

        WeekDays.belongsToMany(models.DeliveryArea, {
          through: 'SampleDeliveryDays',
          as: 'sampleDeliveryDay',
          foreignKey: 'WeekDaysId'
        })

        WeekDays.hasMany(models.CustomerOrder, {
          foreignKey: 'WeekDaysId', as: 'OrderDay' 
        })

        WeekDays.belongsToMany(models.TourPlanning, {
          through: 'TourDays',
          as: 'tourDays',
          foreignKey: 'WeekDaysId'
      })
      }
    }
  )

  return WeekDays
}
