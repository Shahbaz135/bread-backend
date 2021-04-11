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
        type: DataTypes.FLOAT,
        require: true
      },
      purchasingPrice: {
        type: DataTypes.FLOAT,
        require: true
      },
      label: {
        type: DataTypes.INTEGER,
      },
      articleNo: {
        type: DataTypes.STRING,
      },
      sortCapture: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING(200)
      },
      vatRate: {
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.STRING(100)
      },
      orderForm: {
        type: DataTypes.STRING,
      },
      isTrailAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isHideOnSupplierOrder: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      viewArticle: {
        type: DataTypes.BOOLEAN,
      },
      isGraded: {
        type: DataTypes.BOOLEAN,
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
        Product.belongsTo(models.User, {
          as: 'UserProduct',
          foreignKey: 'UserId'
        })
        Product.belongsToMany(models.WeekDays, {
          through: 'ProductDay',
          as: 'productWeekDays',
          foreignKey: 'ProductId'
      })
      }
    }
  )

  return Product
}
