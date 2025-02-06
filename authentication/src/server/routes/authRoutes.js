const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();


router.get("/", (req, res) => {
  res.status(200).json({ message: "Auth route is working!" });
});



router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = Math.floor(10000000 + Math.random() * 90000000).toString(); // Generate 8-digit OTP
  
  try {
    const user = new User({ name, email, password: hashedPassword, otp });
    await user.save();
    res.json({ message: "Signup successful. Check email for OTP." });
  } catch (error) {
    res.status(400).json({ message: "User already exists" });
  }
});

router.post("/signupauth", async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (user && user.otp === otp) {
    user.otp = null; 
    await user.save();
    res.json({ message: "Email verified. You can now log in." });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

module.exports = router;
