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
        message: (props) => `${props.value} is not a valid email!`,
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
      default: 0,
    },
    solvedChallenges: {
      type: Number, // Total count of challenges solved
      default: 0,   // Default is 0
    },
    completedChallenges: {
      type: [String], // Array of strings to store challenge IDs
      default: [],    // Initialize as an empty array
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

const User = mongoose.model("User", userSchema);

module.exports = User;
