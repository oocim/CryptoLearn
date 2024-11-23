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
    const { userId, pointsEarned, challengeId } = req.body;

    // Validate input data
    if (!userId || !pointsEarned || !challengeId) {
        return res.status(400).json({ error: "User ID, points, and challenge ID are required" });
    }

    try {
        // Find the user by their userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the challenge is already completed
        if (user.completedChallenges.includes(challengeId)) {
            return res.status(400).json({ error: "Challenge already completed" });
        }

        // Add points to the user's total points
        user.points += pointsEarned;

        // Increment the total number of solved challenges
        user.solvedChallenges += 1;

        // Add the challengeId to the completedChallenges array
        user.completedChallenges.push(challengeId);

        // Save the updated user data
        await user.save();

        res.json({ message: "Points added successfully", updatedUser: user });
    } catch (error) {
        console.error("Error updating points:", error);
        res.status(500).json({ error: "An error occurred while adding points" });
    }
});


// Get user details by username with total solved challenges
router.get("/user-info/:username", async (req, res) => {
    const { username } = req.params;

    try {
        // Find the user by their username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Return the user info with the total solved challenges and points
        res.json({
            _id: user._id,
            totalSolvedChallenges: user.solvedChallenges, // Directly use the solvedChallenges count
            points: user.points,
            completedChallenges: user.completedChallenges, // Optionally, include completed challenges list
        });
    } catch (error) {
        console.error("Error fetching user info:", error);
        res.status(500).json({ error: "An error occurred while fetching user info" });
    }
});



module.exports = router;
