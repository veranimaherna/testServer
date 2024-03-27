const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const GradeLearning = require("./gradeLearningModel");

const Topics = sequelize.define("Topics", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  topic_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  topic_description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  GradeLearningId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Topics.belongsTo(GradeLearning);
GradeLearning.hasMany(Topics);

module.exports = Topics;
