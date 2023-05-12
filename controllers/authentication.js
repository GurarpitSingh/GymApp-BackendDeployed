const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Workout = require("../models/workouts");

exports.register = async (req, res) => {
  const { email, password, username, name } = req.body;

  try {
    const user = await User.create({ email, password, username, name });
    res.status(201).json({ user: user._id });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error, user not created.");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(email);
    const user = await User.findOne({ email: email });
    if (user.password === password) {
      const token = jwt.sign({ id: user._id }, "secretkey");
      if (token) {
        return res.status(200).json({ token });
      }
    } else {
      throw new Error("Invalid password");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error, user not logged in.");
  }
};

exports.dashboard = async (req, res, next) => {
  const id = req.body.id.id;
  try {
    // console.log(id.id);
    const user = await User.findOne({ _id: id });
    if (user) {
      console.log("reached");
      const { email, username, workouts } = user;
      req.body = user;
      next();
    } else {
      return res.status(400).json("not verified");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getUserDetails = async (req, res) => {
  const id = req.body.id.id;
  try {
    const user = await User.findOne({ _id: id });
    if (user) {
      const { email, username, workouts, name } = user;
      return res.status(200).json({ email, username, name });
    } else {
      return res.status(400).json("not verified");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.updateUserDetails = async (req, res) => {
  const id = req.body.id.id;
  const { email, username, name, password } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { email, username, name, password }
    );
    if (user) {
      const { email, username, workouts, name } = user;
      return res.status(200).json({ message: "Updated" });
    } else {
      return res.status(400).json("not verified");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.verify = async (req, res, next) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, "secretkey");
    if (decoded) {
      // return res.status(200).json({decoded})
      req.body.id = decoded;
      // console.log(req.id);
      next();
    } else {
      return res.status(400).json("not verified");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error, user not logged in.");
  }
};
