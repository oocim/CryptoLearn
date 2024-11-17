const express = require("express");
const router = express.Router();
const {Challenges} = require("../models");


router.get('/', async (req, res) => {
    const listOfChallenges = await Challenges.findAll();
    res.json(listOfChallenges);
});

router.post('/', async (req, res) => {
    const post = req.body;
    await Challenges.create(post);
    res.json(post);
});

module.exports = router;