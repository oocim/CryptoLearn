const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const challengesRouter = require("./routes/Challenges");
const userChallengeProgressRouter = require("./routes/UserChallengeProgress");
const userRouter = require("./routes/Users");

<<<<<<< HEAD
const intermediateRouter = require("./routes/Challenges");
app.use("/challenges", intermediateRouter);
=======
app.use("/challenges", challengesRouter);
app.use("/user-progress", userChallengeProgressRouter);
app.use("/users", userRouter);
>>>>>>> 484da7d347588247ebfe2776e661c14f0e081b3b

const advancedRouter = require("./routes/Challenges");
app.use("/challenges", advancedRouter);

<<<<<<< HEAD
const userProgressRouter = require("./routes/UserChallengeProgress");
app.use("/updateprogress", userProgressRouter);

const createUserRouter = require("./routes/User");
app.use("/user", createUserRouter);
=======
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/crypto";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.get("/", (req, res) => {
    res.send("Cryptography API is running!");
});
>>>>>>> 484da7d347588247ebfe2776e661c14f0e081b3b

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
