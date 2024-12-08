const express = require("express");
const router = express.Router();
const Challenges = require("../models/Challenge");
const UserChallengeProgresses = require("../models/UserChallengeProgress");
const Users = require("../models/User");

const validCategories = ["Beginner", "Intermediate", "Advanced"];
const validCipherTypes = ["Caesar", "Vigenère", "Substitution", "Transposition"];
const validSortFields = ["points", "title", "category"];

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
    const newChallenge = new Challenges({
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
      message: "Challenges created successfully",
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

    const challenges = await Challenges.find(query)
      .skip(parseInt(offset))
      .limit(parseInt(limit))
      .sort({ [sortBy]: order === "ASC" ? 1 : -1 });

    if (challenges.length === 0) {
      return res.status(200).json([]); 
    }

    res.json(challenges);
  } catch (error) {
    console.error("Error fetching challenges:", error);
    res.status(500).json({ error: "An error occurred while fetching challenges" });
  }
});

router.get("/random", async (req, res) => {
  try {
    const count = await Challenges.countDocuments();
    if (count === 0) {
      return res.status(404).json({ error: "No challenges found." });
    }

    const randomIndex = Math.floor(Math.random() * count);
    const randomChallenge = await Challenges.findOne().skip(randomIndex);

    res.json(randomChallenge);
  } catch (error) {
    console.error("Error fetching random challenge:", error);
    res.status(500).json({ error: "An error occurred while fetching the random challenge" });
  }
});

router.get('/beginner/progress', async (req, res) => {
  try {
    // Fetch all beginner challenges
    const challenges = await UserChallengeProgresses.find();
        
    // If no progress data is found, create default progress entries
    if (!challenges.length) {
      const users = await Users.find(); // Use Users instead of User
      
      const result = users.flatMap(user => 
        challenges.map(challenge => ({
          userId: user.userId,
          username: user.username,
          challengeId: challenge._id, // Use _id instead of challengeId
          challengeTitle: challenge.title,
          solved: false,
          points: challenge.points,
          category: challenge.category
        }))
      );
      
      return res.status(200).json(result);
    }
    
    // Filter data for Beginner category
    const filteredData = challenges.filter(entry => entry.category === 'Beginner');
    
    console.log(filteredData);
    
    // Respond with the constructed array
    res.status(200).json(filteredData);
  } catch (error) {
    console.error("Error fetching beginner challenges:", error);
    console.error("Full error details:", error.stack);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

router.get('/intermediate/progress', async (req, res) => {
  try {
    // Fetch all beginner challenges
    const challenges = await UserChallengeProgresses.find();
        
    // If no progress data is found, create default progress entries
    if (!challenges.length) {
      const users = await Users.find(); // Use Users instead of User
      
      const result = users.flatMap(user => 
        challenges.map(challenge => ({
          userId: user.userId,
          username: user.username,
          challengeId: challenge._id, // Use _id instead of challengeId
          challengeTitle: challenge.title,
          solved: false,
          points: challenge.points,
          category: challenge.category
        }))
      );
      
      return res.status(200).json(result);
    }
    
    // Filter data for Beginner category
    const filteredData = challenges.filter(entry => entry.category === 'Intermediate');
    
    console.log(filteredData);
    
    // Respond with the constructed array
    res.status(200).json(filteredData);
  } catch (error) {
    console.error("Error fetching beginner challenges:", error);
    console.error("Full error details:", error.stack);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

router.get('/advanced/progress', async (req, res) => {
  try {
    // Fetch all beginner challenges
    const challenges = await UserChallengeProgresses.find();
        
    // If no progress data is found, create default progress entries
    if (!challenges.length) {
      const users = await Users.find(); // Use Users instead of User
      
      const result = users.flatMap(user => 
        challenges.map(challenge => ({
          userId: user.userId,
          username: user.username,
          challengeId: challenge._id, // Use _id instead of challengeId
          challengeTitle: challenge.title,
          solved: false,
          points: challenge.points,
          category: challenge.category
        }))
      );
      
      return res.status(200).json(result);
    }
    
    // Filter data for Beginner category
    const filteredData = challenges.filter(entry => entry.category === 'Advanced');
    
    console.log(filteredData);
    
    // Respond with the constructed array
    res.status(200).json(filteredData);
  } catch (error) {
    console.error("Error fetching beginner challenges:", error);
    console.error("Full error details:", error.stack);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

module.exports = router;