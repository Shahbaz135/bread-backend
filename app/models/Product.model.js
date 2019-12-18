'use strict'

module.exports = function (sequelize, DataTypes) {
  let Product = sequelize.define('Product',
    {
      name: {
        type: DataTypes.STRING(100),
        require: true
      },
      nameUrdu: {
        type: DataTypes.STRING(100)
      },
      unit: {
        type: DataTypes.STRING(100),
        require: true
      },
      unitUrdu: {
        type: DataTypes.STRING(100)
      },
      thumb: {
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
        Product.belongsTo(models.Category)
        Product.hasMany(models.SupplierProduct, { foreignKey: 'ProductId', as: 'relatedProducts' })
      }
    }
  )

  return Product
}
