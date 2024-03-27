const Learning = require("../models/learningModel");
const Topic = require("../models/topicsModel");
const Quiz = require("../models/quizesModel");

// GET TOPIC
exports.getTopic = async (req, res) => {
  try {
    const listTopics = await Topic.findAll({ include: [Learning, Quiz] });
    res.status(200).json({ message: "List of Topic", data: listTopics });
  } catch (error) {
    res.status(400).json({ message: "Failed to Get Data" });
    
  }
};

// GET TOPIC BY ID
exports.getTopicById = async (req, res) => {
  try {
    const id = req.params.id;
    const listTopics = await Topic.findOne({
      where: {
        id: id,
      },
      include: [Learning, Quiz],
    });
    res.status(200).json({ message: `Topic By Id ${id}`, data: listTopics });
  } catch (error) {
    res.status(400).json({ message: `Failed to Get Topic ${id}` });
  }
};

// POST TOPIC
exports.postTopic = async (req, res) => {
  try {
    const { topic_title_post, topic_description_post, grade_learning_id_post } =
      req.body;

    const createdTopic = await Topic.create({
      topic_title: topic_title_post,
      topic_description: topic_description_post,
      GradeLearningId: grade_learning_id_post,
    });
    res.status(201).json({ message: "Topic Created", data: createdTopic });
  } catch (error) {
    res.status(400).json({ message: "Failed to Save Data" });
    
  }
};

// PUT TOPIC
exports.putTopic = async (req, res) => {
  try {
    const id_put = req.params.id;
    const { topic_title_put, topic_description_put, grade_learning_id_put } =
      req.body;
    await Topic.update(
      {
        topic_title: topic_title_put,
        topic_description: topic_description_put,
        GradeLearningId: grade_learning_id_put,
      },
      {
        where: {
          id: id_put,
        },
      }
    );
    res.status(200).json({ message: "Topic Updated" });
  } catch (error) {
    res.status(400).json({ message: "Failed to Update Data" });
  }
};

// DELETE TOPIC
exports.deleteTopic = async (req, res) => {
  try {
    const id_delete = req.params.id;
    await Topic.destroy({
      where: {
        id: id_delete,
      },
    });
    res.status(200).json({ message: "Topic Deleted" });
  } catch (error) {
    res.status(400).json({ message: "Failed to Delete" });
  }
};
