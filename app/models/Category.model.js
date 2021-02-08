'use strict'

module.exports = function (sequelize, DataTypes) {
  let Category = sequelize.define('Category',
    {
      title: {
        type: DataTypes.STRING(100),
        require: true
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
        Category.hasMany(models.Product, { foreignKey: 'CategoryId', as: 'relatedProducts' })
        Category.belongsTo(models.Partner, {
          as: 'PartnerCategory',
          foreignKey: 'PartnerId'
        })
      }
    }
  )

  return Category
}
