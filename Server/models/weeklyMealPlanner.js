'use strict';

module.exports = (sequelize, DataTypes) => {
  const WeeklyMealPlan = sequelize.define('WeeklyMealPlan', {
    weekStartDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: true,
    },
    weekEndDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    monday: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    tuesday: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    wednesday: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    thursday: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    friday: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    saturday: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    sunday: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  }, {});

  return WeeklyMealPlan;
};