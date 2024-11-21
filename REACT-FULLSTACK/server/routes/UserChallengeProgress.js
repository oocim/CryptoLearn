const express = require("express");
const router = express.Router();
const {UserChallengeProgresses} = require("../models");


router.get('/', async (req, res) => {
    const listOfProgress = await UserChallengeProgresses.findAll();
    res.json(listOfProgress);
});

router.post('/', async (req, res) => {
    try {
        const post = req.body;

        // Assuming the post contains 'userId' and 'challengeId' to identify the record
        const { userId, challengeId, solved } = post;

        // Update the UserProgressChallenge record that matches both userId and challengeId
        const updated = await UserChallengeProgresses.update(post, {
            where: {
                userId,
                challengeId
            }
        });

        // Check if any row was updated and send an appropriate response
        if (updated[0] === 0) {
            return res.status(404).json({ error: 'No matching progress record found to update' });
        }

        // Send back the updated data
        res.json(post);

    } catch (error) {
        console.error('Error updating progress:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
