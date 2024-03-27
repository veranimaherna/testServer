const UserExercise = require("../models/userExerciseModel");
const User = require("../models/userModel");

//GET USER EXERCISE
exports.getUserExercice = async (req, res) => {
  try {
    const listUserExercise = await UserExercise.findAll();
    res
      .status(200)
      .json({ message: "List of User Exercise", data: listUserExercise });
  } catch (error) {
    res.status(400).json({ message: "Failed to Get Data" });
  }
};

//GET USER EXERCISE BY ID
exports.getUserExerciceById = async (req, res) => {
  try {
    const id = req.params.id;
    const listUserExercise = await UserExercise.findOne({
      where: {
        id: id,
      },
    });
    res
      .status(200)
      .json({ message: `User Exercise By Id ${id}`, data: listUserExercise });
  } catch (error) {
    res.status(400).json({ message: "Failed to Get Data" });
  }
};


//GET USER EXERCISE BY USER ID
exports.getUserExerciceByUserId = async (req, res) => {
  try {
    const UserId = req.params.UserId;
    const listUserExercise = await UserExercise.findAll({
      where: {
        UserId: UserId,
      },
      include: User,
    });
    res
      .status(200)
      .json({ message: `User Exercise By Id ${UserId}`, data: listUserExercise });
  } catch (error) {
    res.status(400).json({ message: "Failed to Get Data" });
    console.log(error)
  }
};

exports.postUserExercise = async (req, res) => {
  try {
    const {
      exercise_status_post,
      user_id_post,
      exercise_id_post,
      exercise_score_post,
    } = req.body;

    const createdUserExercise = await UserExercise.create({
      exercise_status: exercise_status_post,
      UserId: user_id_post,
      ExerciseId: exercise_id_post,
      exercise_score: exercise_score_post,
    });
    res
      .status(201)
      .json({ message: "User Exercise Created", data: createdUserExercise });
  } catch (error) {
    res.status(400).json({ message: "Failed to Save Data" });
  }
};

exports.putUserExercise = async (req, res) => {
  try {
    const id_put = req.params.id;
    const { exercise_status_put, exercise_score_put } = req.body;

    await UserExercise.update(
      {
        exercise_status: exercise_status_put,
        exercise_score: exercise_score_put,
      },
      {
        where: {
          id: id_put,
        },
      }
    );
    res.status(201).json({ message: "User Exercise Status updated" });
  } catch (error) {
    res.status(400).json({ message: "Failed to Update Data" });
  }
};
