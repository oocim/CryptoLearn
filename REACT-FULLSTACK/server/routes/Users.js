const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();


router.get("/", async (req, res) => {
    try {
        const users = await User.find({}, { passwordHash: 0 });
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "An error occurred while fetching users" });
    }
});

// Get a specific user by ID
router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId, { passwordHash: 0 });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "An error occurred while fetching the user" });
    }
});

// Create a new user
router.post("/", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: "Username or email already in use" });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            passwordHash,
        });

        await newUser.save();

        res.status(201).json({ message: "User created successfully", userId: newUser._id });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "An error occurred while creating the user" });
    }
});

// Update an existing user
router.put("/:userId", async (req, res) => {
    const { userId } = req.params;
    const { username, email, password } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (userId !== req.user._id && req.user.role !== "admin") {
            return res.status(403).json({ error: "Access denied" });
        }

        if (username) user.username = username;
        if (email) user.email = email;
        if (password) user.passwordHash = await bcrypt.hash(password, 10);

        await user.save();

        res.json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "An error occurred while updating the user" });
    }
});

// Delete a user
router.delete("/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (userId !== req.user._id && req.user.role !== "admin") {
            return res.status(403).json({ error: "Access denied" });
        }

        await user.remove();
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "An error occurred while deleting the user" });
    }
});

// User login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token, userId: user._id });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "An error occurred during login" });
    }
});

// Add points to a user and track solved challenges
router.post("/add-points", async (req, res) => {
    const { userId, difficulty, pointsEarned } = req.body;

    // Validate input data
    if (!userId || !difficulty || !pointsEarned) {
        return res.status(400).json({ error: "User ID, difficulty, and points are required" });
    }

    // Validate difficulty
    const validDifficulties = ["beginner", "intermediate", "advanced"];
    if (!validDifficulties.includes(difficulty)) {
        return res.status(400).json({ error: "Invalid difficulty level" });
    }

    try {
        // Find the user by their userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Add points to the user's total points
        user.points += pointsEarned;

        // Increment the count of solved challenges based on difficulty level
        user.solvedChallenges[difficulty] += 1;

        // Save the updated user data
        await user.save();

        res.json({ message: "Points added successfully", updatedUser: user });
    } catch (error) {
        console.error("Error updating points:", error);
        res.status(500).json({ error: "An error occurred while adding points" });
    }
});

module.exports = router;
