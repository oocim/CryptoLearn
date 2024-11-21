const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;


const beginnerRouter = require("./routes/Challenges");
app.use("/challenges", beginnerRouter);

const intermediateRouter = require("./routes/Challenges");
app.use("/challenges", intermediateRouter);

const advancedRouter = require("./routes/Challenges");
app.use("/challenges", advancedRouter);

const userProgressRouter = require("./routes/UserChallengeProgress");
app.use("/updateprogress", userProgressRouter);

const createUserRouter = require("./routes/User");
app.use("/user", createUserRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
