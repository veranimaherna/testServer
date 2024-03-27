const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Quiz = require('./quizesModel')

const QuizOption = sequelize.define("QuizOption", {
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
    allowNull: true
  },
  QuizeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

});

QuizOption.belongsTo(Quiz);
Quiz.hasMany(QuizOption);
module.exports = QuizOption;
