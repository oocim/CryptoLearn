const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ciphertext: {
      type: String,
      required: true,
    },
    plaintext: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    timeLimit: {
      type: Number,
      required: false,
    },
    hint: {
      type: String,
      required: false,
    },
    cipherType: {
      type: String,
      enum: ["Caesar", "Vigenère", "Substitution", "Transposition"],
      required: true,
    },
    category: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

challengeSchema.index({ category: 1 });

const Challenge = mongoose.model("Challenge", challengeSchema);

module.exports = Challenge;
