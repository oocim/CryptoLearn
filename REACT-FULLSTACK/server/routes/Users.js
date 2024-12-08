const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const initializeUserProgress = require('../utils/initializeUserProgress');

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

// Leaderboards route
router.get('/leaderboards', async (req, res) => {
    try {
        const leaderboards = await User.aggregate([
            // Lookup userChallengeProgresses
            {
                $lookup: {
                    from: 'userchallengeprogresses',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'progresses'
                }
            },
            // Unwind progresses
            { $unwind: '$progresses' },
            // Lookup challenges
            {
                $lookup: {
                    from: 'challenges',
                    localField: 'progresses.challengeId',
                    foreignField: '_id',
                    as: 'challenge'
                }
            },
            // Unwind challenge
            { $unwind: '$challenge' },
            // Match only solved challenges
            { $match: { 'progresses.solved': true } },
            // Group by user to calculate the score and count solved challenges
            {
                $group: {
                    _id: '$_id',
                    username: { $first: '$username' },
                    points: { $sum: '$challenge.points' },
                    solvedChallenges: { $sum: 1 }
                }
            },
            // Sort by points in descending order
            { $sort: { points: -1 } },
            // Limit to top 5 users
            { $limit: 5 },
            // Add rank
            {
                $group: {
                    _id: null,
                    users: { 
                        $push: { 
                            userId: '$_id', 
                            username: '$username', 
                            points: '$points',
                            solvedChallenges: '$solvedChallenges'
                        } 
                    }
                }
            },
            {
                $unwind: {
                    path: '$users',
                    includeArrayIndex: 'rank'
                }
            },
            {
                $project: {
                    _id: 0,
                    rank: { $add: ['$rank', 1] },
                    userId: '$users.userId',
                    username: '$users.username',
                    points: '$users.points',
                    solvedChallenges: '$users.solvedChallenges'
                }
            },
            { $sort: { rank: 1 } }
        ]);

        console.log("Leaderboards:", JSON.stringify(leaderboards, null, 2));
        res.json(leaderboards);
    } catch (error) {
        console.error('Error fetching leaderboards:', error);
        res.status(500).json({ error: 'An error occurred while fetching leaderboards' });
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
        await initializeUserProgress(newUser._id, newUser.username);
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
    const { userId, pointsEarned } = req.body;

    // Validate input data
    if (!userId || !pointsEarned) {
        return res.status(400).json({ error: "User ID and points are required" });
    }

    try {
        // Find the user by their userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Add points to the user's total points
        user.points += pointsEarned;

        // Increment the total number of solved challenges (optional)
        user.solvedChallenges += 1;

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


router.post('/', async (req, res) => {
    try {
        const { userId, username, email, password } = req.body;
        // Create user (you can hash the password before saving in practice)
        const user = await User.create({
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

module.exports = router;