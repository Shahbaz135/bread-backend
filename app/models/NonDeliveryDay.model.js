'use strict'

module.exports = function (sequelize, DataTypes) {
  let NonDeliveryDay = sequelize.define('NonDeliveryDay',
    {
      day: {
        type: DataTypes.DATE,
        require: true
      },
      showOnCustomerPortal: {
        type: DataTypes.BOOLEAN,
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
        NonDeliveryDay.belongsTo(models.User, {
          as: 'UserNonDeliveryDays',
          foreignKey: 'UserId'
        })
    //     Category.belongsToMany(models.WeekDays, {
    //       through: 'CategoryDay',
    //       as: 'categoryDays',
    //       foreignKey: 'CategoryId'
    //   })
      }
    }
  )

  return NonDeliveryDay
}
