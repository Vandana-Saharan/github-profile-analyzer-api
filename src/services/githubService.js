const axios = require("axios");

const fetchGithubProfile = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}`, {
    headers: {
      "Accept": "application/vnd.github+json",
      "User-Agent": "github-profile-analyzer-api",
    },
  });

  return response.data;
};

module.exports = {
  fetchGithubProfile,
};