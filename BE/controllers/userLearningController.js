const UserLearning = require("../models/userLearningModel");
const userLearning = require("../models/userLearningModel");

// GET USER LEARNING
exports.getUserLearning = async (req, res) => {
  try {
    const listUserLearning = await userLearning.findAll();
    res
      .status(200)
      .json({ message: "List of User Learning", data: listUserLearning });
  } catch (error) {
    res.status(400).json({ message: "Failed to Get Data" });
    
  }
};

// GET USER LEARNING BY ID
exports.getUserLearningById = async (req, res) => {
  try {
    const id = req.params.id;
    const listUserLearning = await userLearning.findOne({
      where: {
        id: id,
      },
    });
    res
      .status(200)
      .json({ message: `User Learning By Id ${id}`, data: listUserLearning });
  } catch (error) {
    res
      .status(400)
      .json({ message: `Failed to Get User Learning By Id ${id}` });
  }
};

// POST USER LEARNING
exports.postUserLearning = async (req, res) => {
  try {
    const { learning_status_post, user_id_post, topic_id_post } = req.body;

    const createdUserLearning = await userLearning.create({
      learning_status: learning_status_post,
      UserId: user_id_post,
      TopicId: topic_id_post,
    });
    res
      .status(201)
      .json({ message: "User Learning Created", data: createdUserLearning });
  } catch (error) {
    res.status(400).json({ message: "Failed to Save Data" });
  }
};

exports.putUserLearning = async (req, res) => {
  try {
    const id_put = req.params.id;
    const { learning_status_put } = req.body;

    await UserLearning.update(
      {
        learning_status: learning_status_put,
      },
      {
        where: {
          id: id_put,
        },
      }
    );
    res.status(201).json({ message: "User Learning Status updated" });
  } catch (error) {
    res.status(400).json({ message: "Failed to Update Data" });
  }
};
