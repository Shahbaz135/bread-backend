'use strict'

module.exports = function (sequelize, DataTypes) {
  let CustomerAdditionalOrder = sequelize.define('CustomerAdditionalOrder',
    {
        quantity: {
          type: DataTypes.INTEGER
        },
        product: {
            type: DataTypes.STRING(100),
        },
        price: {
            type: DataTypes.FLOAT
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
        CustomerAdditionalOrder.belongsTo(models.Order, {
          as: 'AdditionalOrderDetail',
          foreignKey: 'AdditionalOrderId'
        })

        CustomerAdditionalOrder.belongsTo(models.WeekDays, {
          as: 'OrderDay',
          foreignKey: 'WeekDaysId'
        })
      }
    }
  )

  return CustomerAdditionalOrder
}
