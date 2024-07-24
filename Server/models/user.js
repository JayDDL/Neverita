module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {});
  // Models associations
  User.associate = function(models) {
    User.hasMany(models.Recipe);
    User.hasMany(models.MealPlan);
  };
  return User;
};