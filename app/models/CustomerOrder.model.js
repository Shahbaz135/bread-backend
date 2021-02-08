'use strict'

module.exports = function (sequelize, DataTypes) {
  let CustomerOrder = sequelize.define('CustomerOrder',
    {
        quantity: {
            type: DataTypes.INTEGER
        },
        product: {
            type: DataTypes.STRING(100),
        },
        price: {
            type: DataTypes.INTEGER
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
        CustomerOrder.belongsTo(models.Order, {
          as: 'OrderDetail',
          foreignKey: 'OrderId'
        })
      }
    }
  )

  return CustomerOrder
}
