const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function (v) {
          return /\S+@\S+\.\S+/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      },
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    lastLogin: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
    points: {
      type: Number,
      default: 0, // Default points set to 0
    },
    solvedChallenges: {
      beginner: {
        type: Number,
        default: 0, // Tracks solved beginner-level challenges
      },
      intermediate: {
        type: Number,
        default: 0, // Tracks solved intermediate-level challenges
      },
      advanced: {
        type: Number,
        default: 0, // Tracks solved advanced-level challenges
      },
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

// Remove the emailVerificationToken index here
// userSchema.index({ emailVerificationToken: 1 });

userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

const User = mongoose.model("User", userSchema);

module.exports = User;
