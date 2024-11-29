const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/User"); // Ensure this path matches your project structure

const router = express.Router();

// Middleware for validating login inputs
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please provide both email and password." });
  }
  next();
};

// Middleware for validating registration inputs
const validateRegister = (req, res, next) => {
  const { name, email, password, confirmPassword, role } = req.body;
  if (!name || !email || !password || !confirmPassword || !role) {
    return res.status(400).json({ message: "Please provide all required fields." });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }
  const validRoles = ["user", "admin", "moderator"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role. Must be 'user', 'admin', or 'moderator'." });
  }
  next();
};


  // For password hashing
  // Import your User model


// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, username, email, password, confirmPassword, role } = req.body;

  // Basic validation
  if (!name || !username || !email || !password || !confirmPassword || !role) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  try {
    // Check if the username or email already exists in the database
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
});




// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
  
    try {
      // Check if user with the provided email exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password.' });
      }
  
      // Compare the provided password with the stored hashed password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid email or password.' });
      }
  
      // Generate a JWT token
      const token = jwt.sign(
        { userId: user._id, role: user.role },  // Payload
        'your_jwt_secret_key',  // Secret key to sign the token
        { expiresIn: '1h' }  // Token expiration time (1 hour)
      );
  
      // Send the token to the client
      res.status(200).json({
        message: 'Login successful.',
        token,  // Send the token in the response
        user: {
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role,
        }
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
  });


  module.exports = router;


