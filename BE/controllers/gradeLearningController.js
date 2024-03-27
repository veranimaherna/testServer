const gradeLearning = require("../models/gradeLearningModel");
const Topics = require("../models/topicsModel");

// GET GRADE LEARNING
exports.getGradeLearning = async (req, res) => {
  try {
    const listGradeLearning = await gradeLearning.findAll({ include: Topics });
    res
      .status(200)
      .json({ message: "List of Grade Learning", data: listGradeLearning });
  } catch (error) {
    res.status(400).json({ message: "Failed to Get Data" });
    
  }
};

// GET GRADE LEARNING BY ID
exports.getGradeLearningById = async (req, res) => {
  try {
    const id = req.params.id;
    const listGradeLearning = await gradeLearning.findOne({
      where: {
        id: id,
      },
      include: Topics,
    });
    res
      .status(200)
      .json({ message: `Grade Learning By Id ${id}`, data: listGradeLearning });
  } catch (error) {
    res.status(400).json({ message: `Failed to Get Exercise ${id}` });
  }
};

// POST LEARNING
exports.postGradeLearning = async (req, res) => {
  try {
    const { grade_name_post } = req.body;

    const createdGradeLearning = await gradeLearning.create({
      grade_name: grade_name_post,
    });
    res
      .status(201)
      .json({ message: "Grade Learning Created", data: createdGradeLearning });
  } catch (error) {
    res.status(400).json({ message: "Failed to Save Data" });
  }
};

// PUT GRADE LEARNING
exports.putGradeLearning = async (req, res) => {
  try {
    const id_put = req.params.id;
    const { grade_name_put } = req.body;
    await gradeLearning.update(
      {
        grade_name: grade_name_put,
      },
      {
        where: {
          id: id_put,
        },
      }
    );
    res.status(200).json({ message: "Grade Learning Updated" });
  } catch (error) {
    res.status(400).json({ message: "Failed to Update Data" });
  }
};

// DELETE GRADE LEARNING
exports.deleteGradeLearning = async (req, res) => {
  try {
    const id_delete = req.params.id;
    await gradeLearning.destroy({
      where: {
        id: id_delete,
      },
    });
    res.status(200).json({ message: "Grade Learning Deleted" });
  } catch (error) {
    res.status(400).json({ message: "Failed to Delete" });
  }
};
