const express = require("express");
const router = express.Router();

const Challenge = require("../models/Challenge");
const User = require("../models/User");
const UserChallengeProgress = require("../models/UserChallengeProgress");


router.get("/:userId", async (req, res) => {
    const { userId } = req.params;

    try {

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        const userProgress = await UserChallengeProgress.find({ userId })
            .populate("challenge", "title description points cipherType")
            .exec();

        if (userProgress.length === 0) {
            return res.status(404).json({ message: "No progress found for the user." });
        }

        res.json(userProgress);
    } catch (error) {
        console.error("Error fetching user progress:", error);
        res.status(500).json({ error: "An error occurred while fetching user progress." });
    }
});

router.post("/", async (req, res) => {
    const { userId, challengeId } = req.body;

    try {
        const user = await User.findById(userId);
        const challenge = await Challenge.findById(challengeId);

        if (!user || !challenge) {
            return res.status(404).json({ error: "User or Challenge not found." });
        }

        const existingProgress = await UserChallengeProgress.findOne({ userId, challengeId });

        if (existingProgress) {
            return res.status(400).json({ error: "Progress already exists for this challenge." });
        }

        const newProgress = new UserChallengeProgress({
            userId,
            challengeId,
        });

        await newProgress.save();

        res.status(201).json(newProgress);
    } catch (error) {
        console.error("Error creating progress record:", error);
        res.status(500).json({ error: "An error occurred while creating progress." });
    }
});

router.put("/:progressId", async (req, res) => {
    const { progressId } = req.params;
    const { solved, attempted } = req.body;

    try {
        const progress = await UserChallengeProgress.findById(progressId);

        if (!progress) {
            return res.status(404).json({ error: "Progress record not found." });
        }

        if (solved !== undefined) progress.solved = solved;
        if (attempted !== undefined) progress.attempted = attempted;

        if (attempted) {
            progress.attempts += 1;
            progress.lastAttemptedAt = new Date();
        }

        await progress.save();

        res.json({ message: "Progress updated successfully.", progress });
    } catch (error) {
        console.error("Error updating progress:", error);
        res.status(500).json({ error: "An error occurred while updating progress." });
    }
});

router.get("/:userId/:challengeId", async (req, res) => {
    const { userId, challengeId } = req.params;

    try {
        const progress = await UserChallengeProgress.findOne({ userId, challengeId });

        if (!progress) {
            return res.status(404).json({ error: "Progress record not found for this challenge and user." });
        }

        res.json(progress);
    } catch (error) {
        console.error("Error fetching progress record:", error);
        res.status(500).json({ error: "An error occurred while fetching progress." });
    }
});

module.exports = router;
