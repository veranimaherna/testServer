const quizOption = require("../models/quizOptionModel");
const Quiz = require("../models/quizesModel");

// GET QUIZ
exports.getQuiz = async (req, res) => {
  try {
    const listQuizes = await Quiz.findAll({ include: quizOption });
    res.status(200).json({ message: "List of Quiz", data: listQuizes });
  } catch (error) {
    res.status(400).json({ message: "Failed to Get Data" });
    
  }
};

// GET QUIZ BY ID
exports.getQuizById = async (req, res) => {
  try {
    const id = req.params.id;
    const listQuizes = await Quiz.findOne({
      where: {
        id: id,
      },
      include: quizOption,
    });
    res.status(200).json({ message: `Quiz By Id ${id}`, data: listQuizes });
  } catch (error) {
    res.status(400).json({ message: `Failed to Get Quiz ${id}` });
  }
};

// POST QUIZ
exports.postQuiz = async (req, res) => {
  try {
    const { quiz_question_post, quiz_question_image_post, quiz_answer_post, topic_id_post } =
      req.body;

    const createdQuiz = await Quiz.create({
      quiz_question: quiz_question_post,
      quiz_question_image: quiz_question_image_post,
      quiz_answer: quiz_answer_post,
      TopicId: topic_id_post
    });
    res.status(201).json({ message: "Quiz Created", data: createdQuiz });
  } catch (error) {
    res.status(400).json({ message: "Failed to Save Data" });
  }
};

// PUT QUIZ
exports.putQuiz = async (req, res) => {
  try {
    const id_put = req.params.id;
    const { quiz_question_put, quiz_question_image_put, quiz_answer_put, topic_id_put } =
      req.body;
    await Quiz.update(
      {
        quiz_question: quiz_question_put,
        quiz_question_image: quiz_question_image_put,
        quiz_answer: quiz_answer_put,
        TopicId: topic_id_put
      },
      {
        where: {
          id: id_put,
        },
      }
    );
    res.status(200).json({ message: "Quiz Updated" });
  } catch (error) {
    res.status(400).json({ message: "Failed to Update Data" });
  }
};

// DELETE QUIZ
exports.deleteQuiz = async (req, res) => {
  try {
    const id_delete = req.params.id;
    await Quiz.destroy({
      where: {
        id: id_delete,
      },
    });
    res.status(200).json({ message: "Quiz Deleted" });
  } catch (error) {
    res.status(400).json({ message: "Failed to Delete" });
  }
};
