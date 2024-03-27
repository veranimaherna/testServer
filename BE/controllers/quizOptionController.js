const quizOption = require("../models/quizOptionModel");

// GET QUIZ OPTION
exports.getQuizOption = async (req, res) => {
  try {
    const listQuizOption = await quizOption.findAll();
    res
      .status(200)
      .json({ message: "List of Quiz Options", data: listQuizOption });
  } catch (error) {
    res.status(400).json({ message: "Failed to Get Data" });
  }
};

// GET QUIZ OPTION BY ID
exports.getQuizOptionById = async (req, res) => {
  try {
    const id = req.params.id;
    const listQuizOption = await quizOption.findOne({
      where: {
        id: id,
      },
    });
    res
      .status(200)
      .json({ message: `Quiz Options By Id ${id}`, data: listQuizOption });
  } catch (error) {
    res.status(400).json({ message: `Failed to Get Quiz Option By Id ${id}` });
  }
};

// POST QUIZ OPTION
exports.postQuizOption = async (req, res) => {
  try {
    const { option_text_post, option_image_post, quiz_id_post } = req.body;

    const createdQuizOption = await quizOption.create({
      option_text: option_text_post,
      option_image: option_image_post,
      QuizeId: quiz_id_post
    });
    res
      .status(201)
      .json({ message: "Quiz Option created", data: createdQuizOption });
  } catch (error) {
    res.status(400).json({ message: "Failed to Save Data" });
  }
};

// PUT QUIZ OPTION
exports.putQuizOption = async (req, res) => {
  try {
    const id_put = req.params.id;
    const { option_text_put, option_image_put,  quiz_id_put } = req.body;
    await quizOption.update(
      {
        option_text: option_text_put,
        option_image: option_image_put,
        QuizeId: quiz_id_put
      },
      {
        where: {
          id: id_put,
        },
      }
    );
    res.status(200).json({ message: "Quiz Option Updated" });
  } catch (error) {
    res.status(400).json({ message: "Failed to Update Data" });
  }
};

// DELETE QUIZ OPTION
exports.deleteQuizOption = async (req, res) => {
  try {
    const id_delete = req.params.id;
    await quizOption.destroy({
      where: {
        id: id_delete,
      },
    });
    res.status(200).json({ message: "Quiz Option Deleted" });
  } catch (error) {
    res.status(400).json({ message: "Failed to Delete Data" });
  }
};
