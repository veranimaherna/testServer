const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const GradeLearning = sequelize.define("GradeLearning", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  grade_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
});

module.exports = GradeLearning;
