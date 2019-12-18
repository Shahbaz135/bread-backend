'use strict'

module.exports = function (sequelize, DataTypes) {
  let Supplier = sequelize.define('Supplier',
    {
      name: {
        type: DataTypes.STRING(100),
        require: true
      },
      nameUrdu: {
        type: DataTypes.STRING(200)
      },
      address: {
        type: DataTypes.STRING(100),
        require: true
      },
      addressUrdu: {
        type: DataTypes.STRING(200)
      },
      image: {
        type: DataTypes.STRING(100)
      },
      showInFilters: {
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
        Supplier.hasMany(models.SupplierProduct, { foreignKey: 'SupplierId', as: 'relatedSuppliers' })
      }
    }
  )

  return Supplier
}
