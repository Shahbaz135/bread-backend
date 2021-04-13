'use strict'

module.exports = function (sequelize, DataTypes) {
  let Order = sequelize.define('Order',
    {
      validFrom: {
        type: DataTypes.DATEONLY,
      },
      expiryDate: {
        type: DataTypes.DATEONLY,
      },
      status: {
        type: DataTypes.STRING
      },
      overAllPrice: {
        type: DataTypes.FLOAT
      },
      isOneTime: {
        type: DataTypes.BOOLEAN
      },
      isTrail: {
        type: DataTypes.BOOLEAN
      },
      isAdditional: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
        Order.hasMany(models.CustomerOrder, { foreignKey: 'OrderId', as: 'OrderDetail' })
        Order.belongsTo(models.Customer, {
          as: 'CustomerOrders',
          foreignKey: 'CustomerId'
        })
        Order.belongsTo(models.Partner, {
            as: 'PartnerOrders',
            foreignKey: 'PartnerId'
          })
      }
    }
  )

  return Order
}
