const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./config/database");
const multer = require("multer");
const bodyParser = require("body-parser")
const path = require("path");

const {
  authenticationToken,
  authenticationTokenAdmin,
} = require("./middleware/auth");
dotenv.config({ path: ".env" });

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome To My API" });
});

app.get('/test', (req, res) => {
  res.send('This is my test route..... ')
})

//migrate
require("./models/userModel");
require("./models/exerciseModel");
require("./models/learningModel");
require("./models/exerciseOptionModel");
require("./models/gradeLearningModel");
require("./models/learningModel");
require("./models/quizOptionModel");
require("./models/quizesModel");
require("./models/topicsModel");
require("./models/userExerciseModel");
require("./models/userLearningModel");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")))

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
    // cb(null, "updateProfileImage/");
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${path.parse(file.originalname).name}-${Date.now()}${extname}`);
  },
});

const upload = multer({ storage });

// END POINT EXERCISE
const {
  getExercise,
  getExerciseById,
  postExercise,
  putExercise,
  deleteExercise,
} = require("./controllers/exerciseController");

app.get("/exercise", authenticationToken, getExercise);
app.get("/exercise/:id", authenticationToken, getExerciseById);
app.post("/exercise", authenticationTokenAdmin, postExercise);
app.put("/exercise/:id", authenticationTokenAdmin, putExercise);
app.delete("/exercise/:id", authenticationTokenAdmin, deleteExercise);

// End Point User
const userController = require("./controllers/userController");
app.post("/register", userController.register);
app.post("/login", userController.login);
app.get("/allProfile", authenticationToken, userController.allProfile);
app.get("/profile/:id", authenticationToken, userController.profileById);
app.put(
  "/avatar/:id",
  upload.single("profilePicture"),
  authenticationToken,
  userController.updateAvatar
);
app.put("/changePassword/:id", userController.changePassword);
app.put("/updateName/:id", userController.updateName);

// END POINT LEARNING
const {
  getLearning,
  getLearningById,
  postLearning,
  putLearning,
  deleteLearning,
} = require("./controllers/learningController");

app.get("/learning", authenticationToken, getLearning);
app.get("/learning/:id", authenticationToken, getLearningById);
app.post("/learning", authenticationTokenAdmin, postLearning);
app.put("/learning/:id", authenticationTokenAdmin, putLearning);
app.delete("/learning/:id", authenticationTokenAdmin, deleteLearning);

// END POINT TOPIC
const {
  getTopic,
  getTopicById,
  postTopic,
  putTopic,
  deleteTopic,
} = require("./controllers/topicController");

app.get("/topic", authenticationToken, getTopic);
app.get("/topic/:id", authenticationToken, getTopicById);
app.post("/topic", authenticationTokenAdmin, postTopic);
app.put("/topic/:id", authenticationTokenAdmin, putTopic);
app.delete("/topic/:id", authenticationTokenAdmin, deleteTopic);

// END POINT GRADE LEARNING
const {
  getGradeLearning,
  getGradeLearningById,
  postGradeLearning,
  putGradeLearning,
  deleteGradeLearning,
} = require("./controllers/gradeLearningController");

app.get("/gradeLearning", authenticationToken, getGradeLearning);
app.get("/gradeLearning/:id", authenticationToken, getGradeLearningById);
app.post("/gradeLearning", authenticationTokenAdmin, postGradeLearning);
app.put("/gradeLearning/:id", authenticationTokenAdmin, putGradeLearning);
app.delete("/gradeLearning/:id", authenticationTokenAdmin, deleteGradeLearning);

// END POINT QUIZ
const {
  getQuiz,
  getQuizById,
  postQuiz,
  putQuiz,
  deleteQuiz,
} = require("./controllers/quizController");

app.get("/quiz", authenticationToken, getQuiz);
app.get("/quiz/:id", authenticationToken, getQuizById);
app.post("/quiz", authenticationTokenAdmin, postQuiz);
app.put("/quiz/:id", authenticationTokenAdmin, putQuiz);
app.delete("/quiz/:id", authenticationTokenAdmin, deleteQuiz);

// END POINT QUIZ OPTION
const {
  getQuizOption,
  getQuizOptionById,
  postQuizOption,
  putQuizOption,
  deleteQuizOption,
} = require("./controllers/quizOptionController");

app.get("/quizOption", authenticationToken, getQuizOption);
app.get("/quizOption/:id", authenticationToken, getQuizOptionById);
app.post("/quizOption", authenticationTokenAdmin, postQuizOption);
app.put("/quizOption/:id", authenticationTokenAdmin, putQuizOption);
app.delete("/quizOption/:id", authenticationTokenAdmin, deleteQuizOption);

// END POINT EXERCISE OPTION
const {
  getExerciseOption,
  getExerciseOptionById,
  postExerciseOption,
  putExerciseOption,
  deleteExerciseOption,
} = require("./controllers/exerciseOptionController");

app.get("/exerciseOption", authenticationToken, getExerciseOption);
app.get("/exerciseOption/:id", authenticationToken, getExerciseOptionById);
app.post("/exerciseOption", authenticationTokenAdmin, postExerciseOption);
app.put("/exerciseOption/:id", authenticationTokenAdmin, putExerciseOption);
app.delete(
  "/exerciseOption/:id",
  authenticationTokenAdmin,
  deleteExerciseOption
);

// END POINT USER LEARNING
const {
  getUserLearning,
  getUserLearningById,
  postUserLearning,
  putUserLearning,
} = require("./controllers/userLearningController");

app.get("/userLearning", authenticationToken, getUserLearning);
app.get("/userLearning/:id", authenticationToken, getUserLearningById);
app.post("/userLearning", authenticationToken, postUserLearning);
app.put("/userLearning/:id", authenticationToken, putUserLearning);

// END POINT USER EXERCISE
const {
  getUserExercice,
  getUserExerciceById,
  postUserExercise,
  putUserExercise,
  getUserExerciceByUserId,
} = require("./controllers/userExerciseController");

app.get("/userExercise", authenticationToken, getUserExercice);
app.get("/userExercise/:id", authenticationToken, getUserExerciceById);
app.get(
  "/userExerciseByUser/:UserId",
  authenticationToken,
  getUserExerciceByUserId
);
app.post("/userExercise", authenticationToken, postUserExercise);
app.put("/userExercise/:id", authenticationToken, putUserExercise);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`App Running on port ${port}`);
  });
});
