const express = require("express");
const path = require('path');
const cors = require('cors');

const db = require("./models");


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

db.sequelize.sync().then(() => {
    app.listen(PORT, function(req, res) {
        console.log("Port 3000 is running.");
    });
});