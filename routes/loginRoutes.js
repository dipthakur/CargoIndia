import express from "express";
import db from "../db/connection.js"; // Ensure correct path to your database connection

const router = express.Router();

// Login Route
router.post("/login", (req, res) => {
  const { email, enterpassword } = req.body;

  // Check if email and password are provided
  if (!email || !enterpassword) {
    return res.status(400).send("Email and password are required");
  }

  // Query to check if the email and password exist in the database
  const query = "SELECT * FROM signup WHERE email = ? AND enterpassword = ?";
  db.query(query, [email, enterpassword], (err, results) => {
    if (err) {
      // Handle database error
      return res.status(500).send("Database error occurred");
    }

    // Check if any matching records found
    if (results.length > 0) {
      // If email and password match, send success response
      const username = results[0].username; // Assuming you have a username field in the database
      req.session.username = username; // Store username in session

      res.status(200).send({ message: "Login successful", username: username });
      // console.log("User logged in:", results[0]);
    } else {
      // If no match, return error message
      res.status(401).send("Invalid email or password");
    }
  });
});

// Route to get the username from the session
router.get("/get-username", (req, res) => {
  if (req.session.username) {
    res.json({ username: req.session.username });
  } else {
    res.json({ username: null });
  }
});

// Logout Route
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.status(200).send("Logout successful");
  });
});

export default router;
