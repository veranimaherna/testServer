const Learning = require("../models/learningModel");

// GET LEARNING
exports.getLearning = async (req, res) => {
  try {
    const listLearning = await Learning.findAll();
    res.status(200).json({ message: "List of Learning", data: listLearning });
  } catch (error) {
    res.status(400).json({ message: "Failed to Get Data" });
    
  }
};

// GET LEARNING BY ID
exports.getLearningById = async (req, res) => {
  try {
    const id = req.params.id;
    const listLearning = await Learning.findOne({
      where: {
        id: id,
      },
    });
    res
      .status(200)
      .json({ message: `Learning By Id ${id}`, data: listLearning });
  } catch (error) {
    res.status(400).json({ message: `Failed to Get Exercise ${id}` });
  }
};

// POST LEARNING
exports.postLearning = async (req, res) => {
  try {
    const { explanation_post, explanation_image_post, topic_id_post } = req.body;

    const createdLearning = await Learning.create({
      explanation: explanation_post,
      explanation_image: explanation_image_post,
      TopicId: topic_id_post
    });
    res
      .status(201)
      .json({ message: "Learning Created", data: createdLearning });
  } catch (error) {
    res.status(400).json({ message: "Failed to Save Data" });
  }
};

// PUT LEARNING
exports.putLearning = async (req, res) => {
  try {
    const id_put = req.params.id;
    const { explanation_put, explanation_image_put, topic_id_put } = req.body;
    await Learning.update(
      {
        explanation: explanation_put,
        explanation_image: explanation_image_put,
        TopicId: topic_id_put
      },
      {
        where: {
          id: id_put,
        },
      }
    );
    res.status(200).json({ message: "Learning Updated" });
  } catch (error) {
    res.status(400).json({ message: "Failed to Update Data" });
  }
};

// DELETE LEARNING
exports.deleteLearning = async (req, res) => {
  try {
    const id_delete = req.params.id;
    await Learning.destroy({
      where: {
        id: id_delete,
      },
    });
    res.status(200).json({ message: "Learning Deleted" });
  } catch (error) {
    res.status(400).json({ message: "Failed to Delete" });
  }
};
