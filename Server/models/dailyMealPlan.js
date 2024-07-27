const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Recipe = require('./recipe');

class DailyMealPlan extends Model {}

DailyMealPlan.init({
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  breakfastId: {
    type: DataTypes.INTEGER,
    references: {
      model: Recipe,
      key: 'id',
    },
  },
  lunchId: {
    type: DataTypes.INTEGER,
    references: {
      model: Recipe,
      key: 'id',
    },
  },
  dinnerId: {
    type: DataTypes.INTEGER,
    references: {
      model: Recipe,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'DailyMealPlan',
});

DailyMealPlan.belongsTo(Recipe, { as: 'breakfast', foreignKey: 'breakfastId' });
DailyMealPlan.belongsTo(Recipe, { as: 'lunch', foreignKey: 'lunchId' });
DailyMealPlan.belongsTo(Recipe, { as: 'dinner', foreignKey: 'dinnerId' });

module.exports = DailyMealPlan;