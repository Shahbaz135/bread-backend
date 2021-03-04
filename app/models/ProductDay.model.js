'use strict'

module.exports = function (sequelize, DataTypes) {
  let ProductDay = sequelize.define('ProductDay', {
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Product',
        key: 'id'
      }
    },
    WeekDaysId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'WeekDays',
        key: 'id'
      }
    }
  })
  return ProductDay
}