const express = require("express");
const router = express.Router();
const {Challenges, Users, UserChallengeProgresses} = require("../models");

router.get('/beginner/progress', async (req, res) => {
    try {
        // Fetch all beginner challenges
        const challenges = await Challenges.findAll();

        // Check if there are any challenges for the 'Beginner' category
        if (!challenges.length) {
            return res.status(404).json({ error: "No beginner challenges found." });
        }

        // Fetch all user challenge progress, even if 'solved' is false (and might be empty)
        const userProgresses = await UserChallengeProgresses.findAll({
            include: [
                { model: Users, attributes: ['userId', 'username'] },
                { model: Challenges, attributes: ['challengeId', 'title', 'category', 'points'] },
            ],
        });

        // If no progress data is found, map users to challenges with default 'solved' as false
        if (!userProgresses.length) {
            const users = await Users.findAll();
            const result = users.map(user => {
                return challenges.map(challenge => ({
                    userId: user.userId,
                    username: user.username,
                    challengeId: challenge.challengeId,
                    challengeTitle: challenge.title,
                    solved: false,  // Default solved status
                    points: challenge.points,
                    category: challenge.category
                }));
            }).flat(); // Flatten the array

            return res.status(200).json(result); // Return the list of all challenges for users
        }

        // Create a result array for user-specific progress
        const result = userProgresses.map(progress => {
            const { userId, username } = progress.User; // User details
            const { challengeId, title, category, points } = progress.Challenge; // Challenge details
            const { solved } = progress; // Progress details

            return {
                userId,
                username,
                challengeId,
                challengeTitle: title,
                category,
                solved,
                points,
            };
        });

        const filteredData = result.filter(entry => entry.category === 'Beginner')
        console.log(filteredData)
        // Respond with the constructed array
        res.status(200).json(filteredData);
    } catch (error) {
        console.error("Error fetching beginner challenges:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/beginner', async (req, res) => {
    try {
        const listOfChallenges = await Challenges.findAll({
            where: { category: 'Beginner' }
        });
        res.json(listOfChallenges);
    } catch (error) {
        console.error('Error fetching challenges:', error);
        res.status(500).json({ error: 'An error occurred while fetching challenges' });
    }
});

router.get('/intermediate/progress', async (req, res) => {
    try {
        // Fetch all beginner challenges
        const challenges = await Challenges.findAll();

        // Check if there are any challenges for the 'Beginner' category
        if (!challenges.length) {
            return res.status(404).json({ error: "No intermediate challenges found." });
        }

        // Fetch all user challenge progress, even if 'solved' is false (and might be empty)
        const userProgresses = await UserChallengeProgresses.findAll({
            include: [
                { model: Users, attributes: ['userId', 'username'] },
                { model: Challenges, attributes: ['challengeId', 'title', 'category', 'points'] },
            ],
        });

        // If no progress data is found, map users to challenges with default 'solved' as false
        if (!userProgresses.length) {
            const users = await Users.findAll();
            const result = users.map(user => {
                return challenges.map(challenge => ({
                    userId: user.userId,
                    username: user.username,
                    challengeId: challenge.challengeId,
                    challengeTitle: challenge.title,
                    solved: false,  // Default solved status
                    points: challenge.points,
                    category: challenge.category
                }));
            }).flat(); // Flatten the array

            return res.status(200).json(result); // Return the list of all challenges for users
        }

        // Create a result array for user-specific progress
        const result = userProgresses.map(progress => {
            const { userId, username } = progress.User; // User details
            const { challengeId, title, category, points } = progress.Challenge; // Challenge details
            const { solved } = progress; // Progress details

            return {
                userId,
                username,
                challengeId,
                challengeTitle: title,
                solved,
                points,
                category
            };
        });

        const filteredData = result.filter(entry => entry.category === 'Intermediate')
        res.status(200).json(filteredData);
    } catch (error) {
        console.error("Error fetching intermediate challenges:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/intermediate', async (req, res) => {
    try {
        const listOfChallenges = await Challenges.findAll({
            where: { category: 'Intermediate' }
        });
        res.json(listOfChallenges);
    } catch (error) {
        console.error('Error fetching challenges:', error);
        res.status(500).json({ error: 'An error occurred while fetching challenges' });
    }
});

router.get('/advanced/progress', async (req, res) => {
    try {
        // Fetch all beginner challenges
        const challenges = await Challenges.findAll();

        // Check if there are any challenges for the 'Beginner' category
        if (!challenges.length) {
            return res.status(404).json({ error: "No intermediate challenges found." });
        }

        // Fetch all user challenge progress, even if 'solved' is false (and might be empty)
        const userProgresses = await UserChallengeProgresses.findAll({
            include: [
                { model: Users, attributes: ['userId', 'username'] },
                { model: Challenges, attributes: ['challengeId', 'title', 'category', 'points'] },
            ],
        });

        // If no progress data is found, map users to challenges with default 'solved' as false
        if (!userProgresses.length) {
            const users = await Users.findAll();
            const result = users.map(user => {
                return challenges.map(challenge => ({
                    userId: user.userId,
                    username: user.username,
                    challengeId: challenge.challengeId,
                    challengeTitle: challenge.title,
                    solved: false,  // Default solved status
                    points: challenge.points,
                    category: challenge.category
                }));
            }).flat(); // Flatten the array

            return res.status(200).json(result); // Return the list of all challenges for users
        }

        // Create a result array for user-specific progress
        const result = userProgresses.map(progress => {
            const { userId, username } = progress.User; // User details
            const { challengeId, title, category, points } = progress.Challenge; // Challenge details
            const { solved } = progress; // Progress details

            return {
                userId,
                username,
                challengeId,
                challengeTitle: title,
                solved,
                points,
                category
            };
        });

        const filteredData = result.filter(entry => entry.category === 'Advanced')
        res.status(200).json(filteredData);
    } catch (error) {
        console.error("Error fetching intermediate challenges:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/advanced', async (req, res) => {
    try {
        const listOfChallenges = await Challenges.findAll({
            where: { category: 'Advanced' }
        });
        res.json(listOfChallenges);
    } catch (error) {
        console.error('Error fetching challenges:', error);
        res.status(500).json({ error: 'An error occurred while fetching challenges' });
    }
});

router.post('/', async (req, res) => {
    const post = req.body;
    await Challenges.create(post);
    res.json(post);
});

module.exports = router;
