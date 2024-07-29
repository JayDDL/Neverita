'use strict';

module.exports = (sequelize, DataTypes) => {
  // Define the WeeklyMealPlan model
  const WeeklyMealPlan = sequelize.define('WeeklyMealPlan', {
    weekStartDate: {
      type: DataTypes.DATEONLY, // Define the weekStartDate field with DATEONLY type
      allowNull: false, // The weekStartDate field is required
      unique: true, // The weekStartDate field must be unique
    },
    weekEndDate: {
      type: DataTypes.DATEONLY, // Define the weekEndDate field with DATEONLY type
      allowNull: false, // The weekEndDate field is required
    },
    monday: {
      type: DataTypes.JSONB, // Define the monday field with JSONB type
      allowNull: true, // The monday field is optional
    },
    tuesday: {
      type: DataTypes.JSONB, // Define the tuesday field with JSONB type
      allowNull: true, // The tuesday field is optional
    },
    wednesday: {
      type: DataTypes.JSONB, // Define the wednesday field with JSONB type
      allowNull: true, // The wednesday field is optional
    },
    thursday: {
      type: DataTypes.JSONB, // Define the thursday field with JSONB type
      allowNull: true, // The thursday field is optional
    },
    friday: {
      type: DataTypes.JSONB, // Define the friday field with JSONB type
      allowNull: true, // The friday field is optional
    },
    saturday: {
      type: DataTypes.JSONB, // Define the saturday field with JSONB type
      allowNull: true, // The saturday field is optional
    },
    sunday: {
      type: DataTypes.JSONB, // Define the sunday field with JSONB type
      allowNull: true, // The sunday field is optional
    },
  }, {});

  // Return the WeeklyMealPlan model
  return WeeklyMealPlan;
};