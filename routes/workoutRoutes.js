const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {
  createWorkout,
  createWorkoutDatabase,
  getAllWorkout,
  addWorkoutToCart,
  deleteWorkoutOfUser,
} = require("../controllers/workoutcontroller");

const { verify } = require("../controllers/authentication");

router.post("/createworkout", createWorkoutDatabase);
router.post("/add", verify, addWorkoutToCart);
router.post("/delete", verify, deleteWorkoutOfUser);
router.post("/getworkouts", verify, getAllWorkout);

module.exports = router;
