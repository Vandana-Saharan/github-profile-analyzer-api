# GitHub Profile Analyzer API

A backend API built using Node.js, Express.js, MySQL, and GitHub Public API.  
This API analyzes a GitHub user profile using the username, stores useful profile insights in a MySQL database, and allows fetching stored analyzed profiles.

---

## Objective

Build a backend service that analyzes a GitHub user profile using GitHub's public API and stores useful insights in a MySQL database.

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- GitHub Public API
- Axios
- dotenv
- CORS

---

## Features

- Fetch public GitHub profile data using username
- Store useful profile insights in MySQL
- Fetch all analyzed GitHub profiles
- Fetch a single analyzed profile by username
- Basic error handling for missing username, invalid GitHub user, and server errors

---

## Useful Insights Stored

The API stores the following GitHub profile details:

- GitHub username
- Name
- Bio
- Location
- Public repository count
- Followers count
- Following count
- GitHub profile URL
- Avatar URL
- GitHub account creation date
- Analysis timestamp

---

## Project Structure

```txt
github-profile-analyzer-api/
│
├── database/
│   └── schema.sql
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── profileController.js
│   │
│   ├── routes/
│   │   └── profileRoutes.js
│   │
│   ├── services/
│   │   └── githubService.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env.example
├── .gitignore
├── package.json
└── README.md