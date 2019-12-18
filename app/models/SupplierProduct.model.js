'use strict'

module.exports = function (sequelize, DataTypes) {
  let SupplierProduct = sequelize.define('SupplierProduct',
    {
      publicPrice: {
        type: DataTypes.DECIMAL(10, 2),
        require: true
      },
      priceForUs: {
        type: DataTypes.DECIMAL(10, 2),
        require: true
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }
    ,
    {
      associate: function (models) {
        SupplierProduct.belongsTo(models.Product)
        SupplierProduct.belongsTo(models.Supplier)
        // SupplierProduct.hasOne(models.Publisher, { foreignKey: 'SupplierProductId', as: 'relatedSupplierProduct' })
      }
    }
  )

  return SupplierProduct
}
