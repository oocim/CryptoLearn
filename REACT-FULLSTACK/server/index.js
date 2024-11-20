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


app.get('/challenges/caesar/beginner', async (req, res) => {
    const challenges = await db.Challenges.findAll();
    res.json(challenges);
});

db.sequelize.sync().then(() => {
    app.listen(PORT, function(req, res) {
        console.log("Port 3000 is running.");
    });
});