module.exports = (sequelize, DataTypes) => {
  const MealPlan = sequelize.define('MealPlan', {
    week: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    meals: {
      type: DataTypes.JSONB, // or DataTypes.ARRAY(DataTypes.STRING)?
      allowNull: false, 
      defaultValue: [] 
    }
  }, {});
  // Models Associations
  MealPlan.associate = function(models) {
    MealPlan.belongsTo(models.User);
    MealPlan.belongsToMany(models.Recipe, { through: 'MealPlanRecipes' }); // 'MealPlanRecipes' to be used as junction table?
  };
  return MealPlan;
};