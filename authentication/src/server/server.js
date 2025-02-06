const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  console.error("Request Body:", req.body);
  res.status(400).json({ message: "Bad Request", error: err.message });
});
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});
app.use((req, res, next) => {
  if (req.headers["content-type"] !== "application/json") {
    return res.status(400).json({ error: "Invalid content type. Use JSON." });
  }
  next();
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app; 