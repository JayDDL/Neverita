module.exports = (sequelize, DataTypes) => {
  const DailyMealPlan = sequelize.define('DailyMealPlan', {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: true,
    },
    breakfastId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Recipes',
        key: 'id',
      },
    },
    lunchId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Recipes',
        key: 'id',
      },
    },
    dinnerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Recipes',
        key: 'id',
      },
    },
  }, {});

  DailyMealPlan.associate = function(models) {
    DailyMealPlan.belongsTo(models.Recipe, { as: 'breakfast', foreignKey: 'breakfastId' });
    DailyMealPlan.belongsTo(models.Recipe, { as: 'lunch', foreignKey: 'lunchId' });
    DailyMealPlan.belongsTo(models.Recipe, { as: 'dinner', foreignKey: 'dinnerId' });
  };

  return DailyMealPlan;
};