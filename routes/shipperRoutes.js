import express from "express";
import db from "../db/connection.js";

const router = express.Router();

// Route to serve the form (optional)
// router.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/index.html"));
// });

// router.get("/contact-us", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/contact-us.html"));
// });

// router.get("/our-service", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/our-service.html"));
// });

// router.get("/request-quotation", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/request-quotation.html"));
// });

// Handle form submissions
router.post("/submit-form", (req, res) => {
  const {
    fName,
    lName,
    email,
    company,
    address,
    city,
    zip,
    telephone,
    numberOfPic,
    totalWeight,
    height,
    width,
    depth,
    commodity,
    message,
  } = req.body;

  // First, check if the email is unique
  const checkEmailSql =
    "SELECT COUNT(*) AS count FROM ShipperInformation WHERE email = ?";

  db.query(checkEmailSql, [email], (err, result) => {
    if (err) {
      console.error("Error checking email:", err);
      return res.status(500).send("Server Error");
    }

    // If email exists
    if (result[0].count > 0) {
      return res
        .status(400)
        .send("Email is already in use. Please use a different email.");
    }

    // Proceed with inserting the data
    const sql =
      "INSERT INTO ShipperInformation (id, first_name, last_name, email, company, address, city, zip, telephone, number_of_pieces, total_weight, height, width, depth, commodity, message) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const values = [
      fName,
      lName,
      email,
      company,
      address,
      city,
      zip,
      telephone,
      numberOfPic,
      totalWeight,
      height,
      width,
      depth,
      commodity,
      message,
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).send(err.sqlMessage);
      }
      res.send("Form submitted successfully");
    });
  });
});

export default router;
