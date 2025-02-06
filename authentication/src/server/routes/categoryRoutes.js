const express = require("express");
const Category = require("../models/Category");
const faker = require("@faker-js/faker");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Protected Route: Get categories (only accessible with valid JWT)
router.get("/menu", verifyToken, async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

// Middleware to verify JWT

// Generate 100 categories with Faker.js
router.post("/generate", async (req, res) => {
  await Category.deleteMany(); // Clear existing data
  let categories = [];
  for (let i = 0; i < 100; i++) {
    categories.push({ name: faker.commerce.department() });
  }
  await Category.insertMany(categories);
  res.json({ message: "100 categories generated" });
});

// Get categories (Protected Route)
router.get("/menu", verifyToken, async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

module.exports = router;
