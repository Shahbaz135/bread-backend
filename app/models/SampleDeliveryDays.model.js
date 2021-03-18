'use strict'

module.exports = function (sequelize, DataTypes) {
  let SampleDeliveryDays = sequelize.define('SampleDeliveryDays', {
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
  return SampleDeliveryDays
}