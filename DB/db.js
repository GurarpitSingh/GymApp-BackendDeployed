const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://sgurarpit:kanavpreet@cluster0.mb8t4k0.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));
