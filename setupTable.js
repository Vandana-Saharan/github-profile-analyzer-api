require("dotenv").config();
const pool = require("./src/config/db");

const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS github_profiles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        name VARCHAR(150),
        bio TEXT,
        location VARCHAR(150),
        public_repos INT DEFAULT 0,
        followers INT DEFAULT 0,
        following INT DEFAULT 0,
        profile_url VARCHAR(255),
        avatar_url VARCHAR(255),
        github_created_at DATETIME,
        analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("github_profiles table created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Failed to create table:", error.message);
    process.exit(1);
  }
};

createTable();