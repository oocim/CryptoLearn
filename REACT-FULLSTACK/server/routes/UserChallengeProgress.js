const express = require("express");
const router = express.Router();

const Challenge = require("../models/Challenge");
const User = require("../models/User");
const UserChallengeProgress = require("../models/UserChallengeProgress");

// Submit an answer and update progress
router.post("/submit-answer", async (req, res) => {
    const { userId, challengeId, answer } = req.body;

    try {
        const user = await User.findById(userId);
        const challenge = await Challenge.findById(challengeId);

        if (!user || !challenge) {
            return res.status(404).json({ error: "User or Challenge not found." });
        }

        let progress = await UserChallengeProgress.findOne({ userId, challengeId });

        if (!progress) {
            progress = new UserChallengeProgress({
                userId,
                challengeId,
                attempts: 0,
                solved: false,
            });
        }

        // Check if the answer is correct
        let isCorrect = answer === challenge.plaintext;

        if (isCorrect) {
            progress.solved = true; // Mark as solved
        } else {
            progress.attempts += 1; // Increment attempts if incorrect
        }

        progress.lastAttemptedAt = new Date();
        await progress.save();

        res.json({ message: isCorrect ? "Correct answer!" : "Incorrect answer, try again.", progress });
    } catch (error) {
        console.error("Error submitting answer:", error);
        res.status(500).json({ error: "An error occurred while submitting the answer." });
    }
});

// Fetch user progress by challenge difficulty (Beginner, Intermediate, Advanced)
router.get("/:userId/:difficulty", async (req, res) => {
    const { userId, difficulty } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Get challenge IDs by difficulty
        const challenges = await Challenge.find({ difficulty });
        const challengeIds = challenges.map(challenge => challenge._id);

        // Fetch user progress for those challenges
        const userProgress = await UserChallengeProgress.find({ userId, challengeId: { $in: challengeIds } })
            .populate("challenge", "title description points cipherType")
            .exec();

        if (userProgress.length === 0) {
            return res.status(404).json({ message: "No progress found for the user in this difficulty." });
        }

        res.json(userProgress);
    } catch (error) {
        console.error("Error fetching user progress:", error);
        res.status(500).json({ error: "An error occurred while fetching user progress." });
    }
});

module.exports = router;
