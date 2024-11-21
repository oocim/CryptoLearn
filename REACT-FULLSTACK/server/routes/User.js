const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const {Challenges, UserChallengeProgresses, Users} = require("../models");


router.get('/leaderboards', async (req, res) => {
    try {
      const leaderboards = await Users.findAll({
        attributes: [
          [sequelize.literal(`ROW_NUMBER() OVER (ORDER BY score DESC)`), 'rank'],
          'userId',
          'username',
          [sequelize.fn('SUM', sequelize.col('UserChallengeProgresses.Challenges.points')), 'score']
        ],
        include: [{
          model: UserChallengeProgresses,
          attributes: [],
          where: { solved: true },
          include: [{
            model: Challenges,
            attributes: []
          }]
        }],
        group: ['Users.userId'],
        order: [[sequelize.literal('score'), 'DESC']],
        limit: 5,
        raw: true
      });
  
      res.json(leaderboards);
    } catch (error) {
      console.error('Error fetching leaderboards:', error);
      res.status(500).json({ error: 'An error occurred while fetching leaderboards' });
    }
  });

router.post('/', async (req, res) => {
    try {
        const { userId, username, email, password } = req.body;

        // Create user (you can hash the password before saving in practice)
        const user = await Users.create({
            userId: userId,
            username: username,
            email: email,
            passwordHash: password // Use a hashed password here
        });

        // Now, create the default progress for all challenges
        await createDefaultProgressForUser(user.userId);

        // Respond with success
        res.status(201).json({
            message: "User registered successfully",
            userId: user.userId,
            username: user.username
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// This function creates default challenge progress for a new user
const createDefaultProgressForUser = async (userId) => {
    try {
        // Fetch all challenges
        const challenges = await Challenges.findAll();

        // Create progress record for each challenge for the new user
        const progressPromises = challenges.map(challenge => {
            return UserChallengeProgresses.create({
                userId: userId,
                challengeId: challenge.challengeId,
                solved: false, // Default progress is not solved
            });
        });

        // Wait for all progress records to be created
        await Promise.all(progressPromises);
    } catch (error) {
        console.error("Error creating default progress:", error);
        throw new Error("Failed to create challenge progress.");
    }
};

module.exports = router;