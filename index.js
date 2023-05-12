const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");

require("./DB/db");
const authenRoutes = require("./routes/authenRoutes");
const workoutRoutes = require("./routes/workoutRoutes");

app.use(express.json());
app.use(cors());

app.use("/auth", authenRoutes);
app.use("/workout", workoutRoutes);

app.listen(3000, () => console.log("Server started on port 3000"));
