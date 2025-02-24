import express from "express";
import db from "../db/connection.js";

const router = express.Router();

router.post("/submit-contact-form", (req, res) => {
  const { name, email, subject, message } = req.body;

  // Email regex to validate the format of the email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Check if the email matches the regex
  if (!emailRegex.test(email)) {
    return res.status(400).send("Invalid email format.");
  }

  // Check if the email already exists in the database
  const checkEmailQuery = "SELECT * FROM ContactUs WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.error("Error checking email:", err);
      return res
        .status(500)
        .send("There was an error processing your request. Please try again.");
    }

    if (results.length > 0) {
      // Email already exists in the database
      return res.status(400).send("User already registered with this email.");
    }

    // If email doesn't exist, proceed with inserting the data
    const insertQuery =
      "INSERT INTO ContactUs (id, name, email, subject, message) VALUES (UUID(), ?, ?, ?, ?)";
    db.query(insertQuery, [name, email, subject, message], (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res
          .status(500)
          .send("There was an error saving your message. Please try again.");
      } else {
        return res.send("Thank you for contacting us!");
      }
    });
  });
});

export default router;
