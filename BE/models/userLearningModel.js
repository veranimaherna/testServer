const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Topics = require("./topicsModel");
const User = require("./userModel");

const UserLearning = sequelize.define("UserLearning", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  learning_status: {
    type: DataTypes.ENUM("done", "in progress", "not started"),
    defaultValue: "not started",
    allowNull: true,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  TopicId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

UserLearning.belongsTo(User);
UserLearning.belongsTo(Topics);
User.hasMany(UserLearning);
module.exports = UserLearning;
