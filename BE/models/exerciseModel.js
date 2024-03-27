const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Exercise = sequelize.define("Exercise", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  exercise_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  exercise_question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  exercise_answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  grade_exercise: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Exercise;
