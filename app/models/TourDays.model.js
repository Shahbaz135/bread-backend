'use strict'

module.exports = function (sequelize, DataTypes) {
  let TourDays = sequelize.define('TourDays', {
    TourPlanningId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'TourPlanning',
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
  return TourDays
}