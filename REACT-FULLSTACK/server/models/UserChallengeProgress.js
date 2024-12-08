const mongoose = require("mongoose");

const userChallengeProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      ref: "User",
      required: true,
    },
    challengeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge",
      required: true,
    },
    category: {
      type: String,
      ref: "Challenge",
      required: true,
    },
    attempted: {
      type: Boolean,
      default: false,
    },
    solved: {
      type: Boolean,
      default: false,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    lastAttemptedAt: {
      type: Date,
      required: false,
    },
    timeSpent: {
      type: Number,
      default: 0,
    },
    progressPercentage: {
      type: Number,
      default: 0.0,
    },
  },
  {
    timestamps: true,
  }
);

userChallengeProgressSchema.index({ userId: 1, challengeId: 1 }, { unique: true });

const UserChallengeProgress = mongoose.model("UserChallengeProgress", userChallengeProgressSchema);

module.exports = UserChallengeProgress;