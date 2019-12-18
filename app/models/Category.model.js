'use strict'

module.exports = function (sequelize, DataTypes) {
  let Category = sequelize.define('Category',
    {
      title: {
        type: DataTypes.STRING(100),
        require: true
      },
      titleUrdu: {
        type: DataTypes.STRING(100)
      },
      thumb: {
        type: DataTypes.STRING(100)
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
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
        Category.hasMany(models.Product, { foreignKey: 'CategoryId', as: 'relatedProducts' })
      }
    }
  )

  return Category
}
