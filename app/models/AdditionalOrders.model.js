'use strict'

module.exports = function (sequelize, DataTypes) {
  let AdditionalOrder = sequelize.define('AdditionalOrder',
    {
      deliveryDate: {
        type: DataTypes.DATEONLY,
      },
      status: {
        type: DataTypes.STRING
      },
      overAllPrice: {
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
        AdditionalOrder.hasMany(models.CustomerAdditionalOrder, { foreignKey: 'AdditionalOrderId', as: 'AdditionalOrderDetail' })
        AdditionalOrder.belongsTo(models.Customer, {
          as: 'CustomerOrders',
          foreignKey: 'CustomerId'
        })
        AdditionalOrder.belongsTo(models.Partner, {
            as: 'PartnerOrders',
            foreignKey: 'PartnerId'
        })
      }
    }
  )

  return AdditionalOrder
}
