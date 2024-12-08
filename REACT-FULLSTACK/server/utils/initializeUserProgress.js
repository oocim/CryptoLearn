const Challenge = require('../models/Challenge');
const UserChallengeProgress = require('../models/UserChallengeProgress');

async function initializeUserProgress(userId, username) {
  try {
    const challenges = await Challenge.find();
    
    const userProgressEntries = challenges.map(challenge => ({
      userId,
      username,
      challengeId: challenge._id,
      attempted: false,
      solved: false,
      attempts: 0,
      progressPercentage: 0.0,
      category: challenge.category
    }));

    await UserChallengeProgress.insertMany(userProgressEntries);
    console.log(`Initialized progress for user ${username}`);
  } catch (error) {
    console.error('Error initializing user progress:', error);
    throw error;
  }
}

module.exports = initializeUserProgress;