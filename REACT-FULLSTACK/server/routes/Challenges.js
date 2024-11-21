const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const {Challenges, Users, UserChallengeProgresses} = require("../models");
=======
const Challenge = require("../models/Challenge");
>>>>>>> 484da7d347588247ebfe2776e661c14f0e081b3b

const validCategories = ["Beginner", "Intermediate", "Advanced"];
const validCipherTypes = ["Caesar", "Vigenère", "Substitution", "Transposition"];
const validSortFields = ["points", "title", "category"];

<<<<<<< HEAD
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
=======
router.post("/", async (req, res) => {
  const {
    title,
    description,
    ciphertext,
    plaintext,
    points,
    timeLimit,
    hint,
    cipherType,
    category,
  } = req.body;

  if (!title || !description || !ciphertext || !plaintext || !points || !cipherType || !category) {
    return res.status(400).json({ error: "All required fields must be provided." });
  }

  if (!validCategories.includes(category)) {
    return res.status(400).json({ error: "Invalid category. Must be 'Beginner', 'Intermediate', or 'Advanced'." });
  }

  if (!validCipherTypes.includes(cipherType)) {
    return res.status(400).json({ error: "Invalid cipher type. Must be 'Caesar', 'Vigenère', 'Substitution', or 'Transposition'." });
  }

  try {
    const newChallenge = new Challenge({
      title,
      description,
      ciphertext,
      plaintext,
      points,
      timeLimit,
      hint,
      cipherType,
      category,
    });

    await newChallenge.save();

    res.status(201).json({
      message: "Challenge created successfully",
      challenge: newChallenge,
    });
  } catch (error) {
    console.error("Error creating challenge:", error);
    res.status(500).json({ error: "An error occurred while creating the challenge" });
  }
});

router.get("/", async (req, res) => {
  const { category, limit = 10, offset = 0, sortBy = "points", order = "DESC" } = req.query;

  if (category && !validCategories.includes(category)) {
    return res.status(400).json({ error: "Invalid category. Must be 'Beginner', 'Intermediate', or 'Advanced'." });
  }

  if (!validSortFields.includes(sortBy)) {
    return res.status(400).json({ error: "Invalid sort field. Choose from 'points', 'title', 'category'." });
  }

  try {

    const query = {};
    if (category) query.category = category;

    const challenges = await Challenge.find(query)
      .skip(parseInt(offset))
      .limit(parseInt(limit))
      .sort({ [sortBy]: order === "ASC" ? 1 : -1 });

    if (challenges.length === 0) {
      return res.status(200).json([]); 
>>>>>>> 484da7d347588247ebfe2776e661c14f0e081b3b
    }

    res.json(challenges);
  } catch (error) {
    console.error("Error fetching challenges:", error);
    res.status(500).json({ error: "An error occurred while fetching challenges" });
  }
});

<<<<<<< HEAD
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
=======
module.exports = router;
>>>>>>> 484da7d347588247ebfe2776e661c14f0e081b3b
