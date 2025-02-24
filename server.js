import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import contactRoutes from "./routes/contactRoutes.js";
import shipperRoutes from "./routes/shipperRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import signupRoutes from "./routes/signupRoutes.js";

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Use the routes
app.use(contactRoutes);
app.use(shipperRoutes);
app.use(loginRoutes);
app.use(signupRoutes);

// Start the server
const PORT = 3308;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
