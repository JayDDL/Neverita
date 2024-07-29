module.exports = (sequelize, DataTypes) => {
  // Define the DailyMealPlan model
  const DailyMealPlan = sequelize.define('DailyMealPlan', {
    date: {
      type: DataTypes.DATEONLY, // Define the date field with DATEONLY type
      allowNull: false, // The date field is required
      unique: true, // The date field must be unique
    },
    breakfastId: {
      type: DataTypes.INTEGER, // Define the breakfastId field with INTEGER type
      references: {
        model: 'Recipes', // Reference the Recipes model
        key: 'id', // Reference the id field in the Recipes model
      },
    },
    lunchId: {
      type: DataTypes.INTEGER, // Define the lunchId field with INTEGER type
      references: {
        model: 'Recipes', // Reference the Recipes model
        key: 'id', // Reference the id field in the Recipes model
      },
    },
    dinnerId: {
      type: DataTypes.INTEGER, // Define the dinnerId field with INTEGER type
      references: {
        model: 'Recipes', // Reference the Recipes model
        key: 'id', // Reference the id field in the Recipes model
      },
    },
  }, {});

  // Associate the DailyMealPlan model with the Recipe model
  DailyMealPlan.associate = function(models) {
    // Define the relationship between DailyMealPlan and Recipe for breakfast
    DailyMealPlan.belongsTo(models.Recipe, { as: 'breakfast', foreignKey: 'breakfastId' });
    // Define the relationship between DailyMealPlan and Recipe for lunch
    DailyMealPlan.belongsTo(models.Recipe, { as: 'lunch', foreignKey: 'lunchId' });
    // Define the relationship between DailyMealPlan and Recipe for dinner
    DailyMealPlan.belongsTo(models.Recipe, { as: 'dinner', foreignKey: 'dinnerId' });
  };

  // Return the DailyMealPlan model
  return DailyMealPlan;
};