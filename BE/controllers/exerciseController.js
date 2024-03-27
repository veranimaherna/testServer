const Exercise = require("../models/exerciseModel");
const ExerciseOption = require("../models/exerciseOptionModel");

// GET EXERCISE
exports.getExercise = async (req, res) => {
  try {
    const listExercises = await Exercise.findAll({ include: ExerciseOption });
    res.status(200).json({ message: "List of Exercises", data: listExercises });
  } catch (error) {
    res.status(400).json({ message: "Failed to Get Data" });
  }
};

// GET EXERCISE BY ID
exports.getExerciseById = async (req, res) => {
  try {
    const id = req.params.id;
    const listExercise = await Exercise.findOne({
      where: {
        id: id,
      },
      include: ExerciseOption,
    });
    res
      .status(200)
      .json({ message: `Exercise By Id ${id}`, data: listExercise });
  } catch (error) {
    res.status(400).json({ message: `Failed to Get Data By Id ${id}` });
  }
};

// POST EXERCISE
exports.postExercise = async (req, res) => {
  try {
    const {
      exercise_name_post,
      exercise_question_post,
      exercise_answer_post,
      grade_exercise_post,
    } = req.body;
    const createdExercise = await Exercise.create({
      exercise_name: exercise_name_post,
      exercise_question: exercise_question_post,
      exercise_answer: exercise_answer_post,
      grade_exercise: grade_exercise_post,
    });
    res
      .status(201)
      .json({ message: "Exercise Created", data: createdExercise });
  } catch (error) {
    res.status(400).json({ message: "Failed to Save Data" });
  }
};

// PUT EXERCISE
exports.putExercise = async (req, res) => {
  try {
    const id_put = req.params.id;
    const {
      exercise_name_put,
      exercise_question_put,
      exercise_answer_put,
      grade_exercise_put,
    } = req.body;
    await Exercise.update(
      {
        exercise_name: exercise_name_put,
        exercise_question: exercise_question_put,
        exercise_answer: exercise_answer_put,
        grade_exercise: grade_exercise_put,
      },
      {
        where: {
          id: id_put,
        },
      }
    );
    res.status(200).json({ message: "Exercise Updated" });
  } catch (error) {
    res.status(400).json({ message: "Failed to Update Data" });
  }
};

exports.deleteExercise = async (req, res) => {
  try {
    const id_delete = req.params.id;
    await Exercise.destroy({
      where: {
        id: id_delete,
      },
    });
    res.status(200).json({ message: "Exercise Deleted" });
  } catch (error) {
    res.status(400).json({ message: "Failed to Delete" });
  }
};
