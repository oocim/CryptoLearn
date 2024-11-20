const express = require("express");
const router = express.Router();
const {Challenges} = require("../models");


router.get('/beginner', async (req, res) => {
    try {
        const listOfChallenges = await Challenges.findAll({
            where: { cipherType: 'Beginner' }
        });
        res.json(listOfChallenges);
    } catch (error) {
        console.error('Error fetching challenges:', error);
        res.status(500).json({ error: 'An error occurred while fetching challenges' });
    }
});

router.get('/intermediate', async (req, res) => {
    try {
        const listOfChallenges = await Challenges.findAll({
            where: { cipherType: 'Intermediate' }
        });
        res.json(listOfChallenges);
    } catch (error) {
        console.error('Error fetching challenges:', error);
        res.status(500).json({ error: 'An error occurred while fetching challenges' });
    }
});

router.get('/advanced', async (req, res) => {
    try {
        const listOfChallenges = await Challenges.findAll({
            where: { cipherType: 'Advanced' }
        });
        res.json(listOfChallenges);
    } catch (error) {
        console.error('Error fetching challenges:', error);
        res.status(500).json({ error: 'An error occurred while fetching challenges' });
    }
});

module.exports = router;