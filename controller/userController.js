const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const express = require("express");
// const app = express();
// app.use(express.static('Public'));
// app.use('/images',(()=> {express.static('public_image')}));


exports.registerUser = async (req, res) => {
  try {
    const username = req.body?.Username;
    const password = req.body?.Password;

    // Check if the email or username already exists in the database

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email or username already exists' });
    }
    // Check password length before hashing
    if (password.length < 8 || password.length > 20) {
      return res.status(400).json({ success: false, message: 'Password must be between 8 and 20 characters long' });
    }
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign(
      {
        username: newUser.username,
      },
      'Route-Token'
    );

    // User registered and logged in successfully
    res.status(201).json({ success: true, message: 'User registered and logged in successfully', token });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Registration failed', error: err.message });
  }
};

exports.GetPublicRoute = async (req, res) => {
  try {
    express.static('Public');
    express.static('public_image');

    res.status(200).json({ success: true, });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.GetPrivateRoute = async (req, res) => {
  try {

    res.status(200).json({ success: true, message: "" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login Required", error: err.message });
  }
};

