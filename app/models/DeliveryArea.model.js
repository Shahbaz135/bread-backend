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
      orderReferenceRegular: {
        type: DataTypes.STRING(200)
      },
      orderReferenceTrail: {
        type: DataTypes.STRING(200)
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
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

        DeliveryArea.hasMany(models.Customer, { 
          foreignKey: 'DeliveryAreaId', 
          as: 'DeliveryAreaCustomer' 
        })
        
      }
    }
  )

  return DeliveryArea
}
