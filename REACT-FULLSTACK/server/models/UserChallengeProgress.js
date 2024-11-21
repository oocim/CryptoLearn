<<<<<<< HEAD
module.exports = (sequelize, DataTypes) => {
    const UserChallengeProgresses = sequelize.define("UserChallengeProgresses", {
        progressId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'userId',
            },
        },
        challengeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Challenges',
                key: 'challengeId',
            },
        },
        solved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });
=======
const mongoose = require("mongoose");
>>>>>>> 484da7d347588247ebfe2776e661c14f0e081b3b

const userChallengeProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    challengeId: {
      type: mongoose.Schema.Types.ObjectId,
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
