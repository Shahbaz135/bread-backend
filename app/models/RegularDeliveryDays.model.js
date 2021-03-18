'use strict'

module.exports = function (sequelize, DataTypes) {
  let RegularDeliveryDays = sequelize.define('RegularDeliveryDays', {
    DeliveryAreaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'DeliveryArea',
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
  return RegularDeliveryDays
}