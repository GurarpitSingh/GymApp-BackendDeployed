const mongoose = require("mongoose");
const express = require("express");

const workoutSchema = new mongoose.Schema({
  goal: {
    type: String,
  },
  exercises: {
    type: [Object],
  },
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
