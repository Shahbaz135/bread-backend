'use strict'

module.exports = function (sequelize, DataTypes) {
  let DeliveryArea = sequelize.define('DeliveryArea',
    {
      postCode: {
        type: DataTypes.INTEGER,
        require: true
      },
      description: {
        type: DataTypes.STRING(200)
      },
      state: {
        type: DataTypes.STRING(100)
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
        DeliveryArea.belongsToMany(models.WeekDays, {
          through: 'RegularDeliveryDays',
          as: 'regularDeliveryDay',
          foreignKey: 'DeliveryAreaId'
      })
      DeliveryArea.belongsToMany(models.WeekDays, {
        through: 'SampleDeliveryDays',
        as: 'sampleDeliveryDay',
        foreignKey: 'DeliveryAreaId'
    })
      }
    }
  )

  return DeliveryArea
}
