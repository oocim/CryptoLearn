const express = require("express");
const path = require('path');

const db = require("./models");


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const challRouter = require("./routes/Challenges");
app.use("/challenges", challRouter);

app.get('/caesar', async (req, res) => {
    const challenges = await db.Challenges.findAll();
    res.json(challenges);
});

db.sequelize.sync().then(() => {
    app.listen(PORT, function(req, res) {
        console.log("Port 3000 is running.");
    });
});