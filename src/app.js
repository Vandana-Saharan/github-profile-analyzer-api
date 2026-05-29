const express = require("express");
const cors = require("cors");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "GitHub Profile Analyzer API is running",
  });
});

app.use("/api/profiles", profileRoutes);

module.exports = app;