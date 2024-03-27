const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Topics = require("./topicsModel");

const Learning = sequelize.define("Learning", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  explanation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  explanation_image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  TopicId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

Learning.belongsTo(Topics);
Topics.hasMany(Learning);
module.exports = Learning;
