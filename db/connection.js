import mysql from "mysql";

const db = mysql.createConnection({
  host: "",//Host No
  port: "",//Port
  user: "root", 
  password: "1234", 
  database: "",//DB Name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

export default db;
