'use strict'

module.exports = function (sequelize, DataTypes) {
  let OrderInterruption = sequelize.define('OrderInterruption',
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
        OrderInterruption.belongsTo(models.Order, { foreignKey: 'OrderId', as: 'InterruptionOrder' })
        OrderInterruption.belongsTo(models.Customer, {
          as: 'CustomerInterruption',
          foreignKey: 'CustomerId'
        })
        OrderInterruption.belongsTo(models.Partner, {
            as: 'PartnerInterruption',
            foreignKey: 'PartnerId'
          })
      }
    }
  )

  return OrderInterruption
}
