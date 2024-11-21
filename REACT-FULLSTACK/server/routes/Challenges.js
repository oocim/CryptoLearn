const express = require("express");
const router = express.Router();
const Challenge = require("../models/Challenge");

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
    }

    res.json(challenges);
  } catch (error) {
    console.error("Error fetching challenges:", error);
    res.status(500).json({ error: "An error occurred while fetching challenges" });
  }
});

module.exports = router;
