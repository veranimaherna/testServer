const ExerciseOption = require("../models/exerciseOptionModel");

// GET EXERCISE OPTION
exports.getExerciseOption = async (req, res) => {
  try {
    const listExerciseOption = await ExerciseOption.findAll();
    res
      .status(200)
      .json({ message: "List of Exercise Options", data: listExerciseOption });
  } catch (error) {
    res.status(400).json({ message: "Failed to Get Data" });
  }
};

// GET EXERCISE OPTION BY ID
exports.getExerciseOptionById = async (req, res) => {
  try {
    const id = req.params.id;
    const listExerciseOption = await ExerciseOption.findOne({
      where: {
        id: id,
      },
    });
    res
      .status(200)
      .json({
        message: `Exercise Option By Id ${id}`,
        data: listExerciseOption,
      });
  } catch (error) {
    res
      .status(400)
      .json({ message: `Failed to Get Exercise Option By Id ${id}` });
  }
};

// POST EXERCISE OPTION
exports.postExerciseOption = async (req, res) => {
  try {
    const { option_text_post, option_image_post, exercise_id_post } = req.body;

    const createdExerciseOption = await ExerciseOption.create({
      option_text: option_text_post,
      option_image: option_image_post,
      ExerciseId: exercise_id_post,
    });
    res.status(201).json({
      message: "Exercise Option created",
      data: createdExerciseOption,
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to Save  Data" });
  }
};

// PUT EXERCISE OPTION
exports.putExerciseOption = async (req, res) => {
  try {
    const id_put = req.params.id;
    const { option_text_put, option_image_put, exercise_id_put } = req.body;

    await ExerciseOption.update(
      {
        option_text: option_text_put,
        option_image: option_image_put,
        ExerciseId: exercise_id_put,
      },
      {
        where: {
          id: id_put,
        },
      }
    );
    res.status(201).json({ message: "Exercise Option Updated" });
  } catch (error) {
    res.status(400).json({ message: "Failed to Update  Data" });
  }
};

// DELETE EXERCISE OPTION
exports.deleteExerciseOption = async (req, res) => {
  try {
    const id_delete = req.params.id;
    await ExerciseOption.destroy({
      where: {
        id: id_delete,
      },
    });
    res.status(200).json({ message: "Exercise Option Deleted" });
  } catch (error) {
    res.status(400).json({ message: "Failed to Delete Data" });
  }
};
