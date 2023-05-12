const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const {
  register,
  login,
  verify,
  dashboard,
  getUserDetails,
  updateUserDetails,
} = require("../controllers/authentication");
const { getUserWorkouts } = require("../controllers/workoutcontroller");

router.post("/register", register);
router.post("/login", login);
router.post("/dashboard", verify, dashboard, getUserWorkouts);
router.post("/userdetails", verify, getUserDetails);
router.post("/updateuser", verify, updateUserDetails);
// router.post('/verify', verify)

module.exports = router;
