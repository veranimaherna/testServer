const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Topics = require("./topicsModel");

const Quiz = sequelize.define("Quizes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quiz_question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quiz_question_image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quiz_answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  TopicId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});


Quiz.belongsTo(Topics);
Topics.hasMany(Quiz);
module.exports = Quiz;
