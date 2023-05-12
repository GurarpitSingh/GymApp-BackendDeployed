const Workout = require("../models/workouts");
const User = require("../models/User");

exports.createWorkout = async (req, res) => {
  const { goal, exercises, userId } = req.body;

  try {
    const workout = await Workout.create({ goal, exercises });
    const user = await User.findOne({ _id: userId });
    user.workouts.push(workout);
    user.save();
    res.status(201).json({ workout: workout._id });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error, workout not created.");
  }
};

exports.addWorkoutToCart = async (req, res) => {
  const workoutId = req.body.workoutId;
  const userId = req.body.id.id;

  try {
    const user = await User.findOne({ _id: userId });
    if (user.workouts.includes(workoutId)) {
      res.status(400).json({ message: "Workout already in cart." });
    } else {
      user.workouts.push(workoutId);
      user.save();
      res.status(201).json({ message: "Workout added to cart." });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Error, workout not added to cart.");
  }
};

exports.getUserWorkouts = async (req, res) => {
  console.log("object");
  console.log(req.body);
  const workouts = req.body.workouts;
  try {
    const userWorkouts = await Workout.find({ _id: workouts });
    return res.status(200).json({ name: req.body.name, workout: userWorkouts });
    // console.log(userWorkouts);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error, workouts not found.");
  }
};

exports.createWorkoutDatabase = async (req, res) => {
  const { goal, exercises } = req.body;

  try {
    const workout = await Workout.create({ goal, exercises });
    res.status(201).json(workout);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error, workout not created.");
  }
};

exports.deleteWorkoutOfUser = async (req, res) => {
  const workoutId = req.body.workoutId;
  const userId = req.body.id.id;

  try {
    const user = await User.findOne({ _id: userId });
    console.log(user.workouts);
    user.workouts.pull(workoutId);
    user.save();
    res.status(201).json({ message: "Workout deleted from cart." });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error, workout not deleted from cart.");
  }
};

exports.setProgress = async (req, res) => {
  const workoutId = req.body.workoutId;
  const userId = req.body.id.id;
};

exports.getAllWorkout = async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json(workouts);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error, workouts not found.");
  }
};
