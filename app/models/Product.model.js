'use strict'

module.exports = function (sequelize, DataTypes) {
  let Product = sequelize.define('Product',
    {
      name: {
        type: DataTypes.STRING(100),
        require: true
      },
      designation: {
        type: DataTypes.STRING(100),
        require: true
      },
      shortDescription: {
        type: DataTypes.STRING(100)
      },
      productPrice: {
        type: DataTypes.INTEGER,
        require: true
      },
      purchasingPrice: {
        type: DataTypes.INTEGER,
        require: true
      },
      label: {
        type: DataTypes.INTEGER,
      },
      item: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.STRING(200)
      },
      vatRate: {
        type: DataTypes.INTEGER
      },
      image: {
        type: DataTypes.STRING(100)
      },
      orderFrom: {
        type: DataTypes.DATEONLY,
      },
      isTrailAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      availableDays: {
        type: DataTypes.JSON
      },
      isHideOnSupplierOrder: {
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
        Product.belongsTo(models.Category)
        Product.belongsTo(models.Partner, {
          as: 'PartnerProduct',
          foreignKey: 'PartnerId'
        })
      }
    }
  )

  return Product
}
