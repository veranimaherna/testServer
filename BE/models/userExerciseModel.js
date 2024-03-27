const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./userModel");
const Exercise = require("./exerciseModel");

const UserExercise = sequelize.define("UserExercise", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  exercise_status: {
    type: DataTypes.ENUM("done", "in progress", "not started"),
    defaultValue: "not started",
    allowNull: true,
  },
  exercise_score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ExerciseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

UserExercise.belongsTo(User);
User.hasMany(UserExercise);
UserExercise.belongsTo(Exercise);
module.exports = UserExercise;
