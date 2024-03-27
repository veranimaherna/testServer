const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Exercise = require("./exerciseModel");

const ExerciseOption = sequelize.define("ExerciseOption", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  option_text: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  option_image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ExerciseId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Exercise.hasMany(ExerciseOption);
ExerciseOption.belongsTo(Exercise);
module.exports = ExerciseOption;
