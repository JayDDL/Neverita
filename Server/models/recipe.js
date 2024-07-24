module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    ingredients: {
      type: DataTypes.JSONB, // or DataTypes.ARRAY(DataTypes.STRING)?
      allowNull: false,
      defaultValue: []
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preparationMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cookingMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  // Model association
  Recipe.associate = function(models) {
    Recipe.belongsTo(models.User);
  };
  return Recipe;
};