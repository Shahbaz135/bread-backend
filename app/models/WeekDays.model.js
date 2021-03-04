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
      }
    }
  )

  return WeekDays
}
