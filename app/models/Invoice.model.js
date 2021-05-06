'use strict'

module.exports = function (sequelize, DataTypes) {
  let Invoice = sequelize.define('Invoice',
    {
      invoiceNumber: {
        type: DataTypes.INTEGER,
      },
      amount: {
        type: DataTypes.FLOAT
      },
      dateFrom: {
        type: DataTypes.DATEONLY
      },
      dateTo: {
        type: DataTypes.DATEONLY
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
        Invoice.belongsTo(models.Customer, {
          as: 'CustomerInvoice',
          foreignKey: 'CustomerId'
        })
        Invoice.belongsTo(models.Partner, {
            as: 'PartnerInvoice',
            foreignKey: 'PartnerId'
        })
        Invoice.belongsTo(models.Order, {
            as: 'OrderInvoice',
            foreignKey: 'OrderId'
        })
        Invoice.belongsTo(models.AdditionalOrder, {
            as: 'AdditionalOrderInvoice',
            foreignKey: 'AdditionalOrderId'
        })
      }
    }
  )

  return Invoice
}
