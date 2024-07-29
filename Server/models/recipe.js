module.exports = (sequelize, DataTypes) => {
  // Define the Recipe model
  const Recipe = sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING, // Define the name field with STRING type
      allowNull: false, // The name field is required
    },
    description: {
      type: DataTypes.TEXT, // Define the description field with TEXT type
      allowNull: false, // The description field is required
    },
    ingredients: {
      type: DataTypes.JSONB, // Define the ingredients field with JSONB type to store ingredients as an array of JSON objects
      allowNull: false, // The ingredients field is required
      defaultValue: [], // Default value for the ingredients field is an empty array
    },
  }, {});

  // Model association
  Recipe.associate = function(models) {
    // Define the relationship between Recipe and User
    Recipe.belongsTo(models.User); // A Recipe belongs to a User
  };

  // Return the Recipe model
  return Recipe;
};