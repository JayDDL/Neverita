export default (sequelize, DataTypes) => {
	// Define the User model
	const User = sequelize.define(
		"User",
		{
			name: {
				type: DataTypes.STRING, // Define the name field with STRING type
				allowNull: false, // The name field is required
			},
			email: {
				type: DataTypes.STRING, // Define the email field with STRING type
				allowNull: false, // The email field is required
				unique: true, // The email field must be unique
			},
		},
		{},
	);

	// Model associations
	User.associate = (models) => {
		// Define the relationship between User and Recipe
		User.hasMany(models.Recipe); // A User has many Recipes
		// Define the relationship between User and MealPlan
		User.hasMany(models.MealPlan); // A User has many MealPlans
	};

	// Return the User model
	return User;
};
