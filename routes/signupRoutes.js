import express, { query } from "express";
import db from "../db/connection.js"; // Ensure your db connection is correct

const router = express.Router();

// Signup Route
router.post("/signup", (req, res) => {
  const { username, email, enterpassword, confirmpassword } = req.body;

  // Check if all fields are provided
  if (!username || !email || !enterpassword || !confirmpassword) {
    return res.status(400).send("All fields are required");
  }

  // Check if passwords match
  if (enterpassword !== confirmpassword) {
    return res.status(400).send("Passwords do not match");
  }

  // Check if email already exists
  const checkEmailQuery = "SELECT * FROM signup WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      return res.status(500).send("Database error");
    }

    // If email exists, return error
    if (results.length > 0) {
      return res.status(400).send("Email already exists");
    }

    // Insert new user into the database
    const insertQuery =
      "INSERT INTO signup (id, username, email, enterpassword, confirmpassword) VALUES (UUID(), ?, ?, ?, ?)";
    db.query(
      insertQuery,
      [username, email, enterpassword, confirmpassword],
      (err, result) => {
        if (err) {
          console.log(username, email, enterpassword, confirmpassword);
          return res.status(500).send("Error saving user to the database");
        }

        // Successful signup
        res.status(201).send("Signup successful");
      }
    );
  });
});

export default router;
