module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.JSONB, // Store ingredients as an array of JSON objects
      allowNull: false,
      defaultValue: [],
    },
  }, {});

  // Model association
  Recipe.associate = function(models) {
    Recipe.belongsTo(models.User);
  };

  return Recipe;
};