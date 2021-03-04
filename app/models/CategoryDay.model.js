'use strict'

module.exports = function (sequelize, DataTypes) {
  let CategoryDay = sequelize.define('CategoryDay', {
    CategoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Category',
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
  return CategoryDay
}