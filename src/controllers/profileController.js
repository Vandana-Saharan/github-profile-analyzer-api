const pool = require("../config/db");
const { fetchGithubProfile } = require("../services/githubService");
//business logic
const analyzeProfile = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "GitHub username is required",
      });
    }

    const githubData = await fetchGithubProfile(username);

    const profileData = {
      username: githubData.login,
      name: githubData.name,
      bio: githubData.bio,
      location: githubData.location,
      public_repos: githubData.public_repos,
      followers: githubData.followers,
      following: githubData.following,
      profile_url: githubData.html_url,
      avatar_url: githubData.avatar_url,
      github_created_at: githubData.created_at
  ? new Date(githubData.created_at).toISOString().slice(0, 19).replace("T", " ")
  : null,
    };

    const query = `
      INSERT INTO github_profiles
      (
        username,
        name,
        bio,
        location,
        public_repos,
        followers,
        following,
        profile_url,
        avatar_url,
        github_created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        bio = VALUES(bio),
        location = VALUES(location),
        public_repos = VALUES(public_repos),
        followers = VALUES(followers),
        following = VALUES(following),
        profile_url = VALUES(profile_url),
        avatar_url = VALUES(avatar_url),
        github_created_at = VALUES(github_created_at),
        analyzed_at = CURRENT_TIMESTAMP
    `;

    await pool.query(query, [
      profileData.username,
      profileData.name,
      profileData.bio,
      profileData.location,
      profileData.public_repos,
      profileData.followers,
      profileData.following,
      profileData.profile_url,
      profileData.avatar_url,
      profileData.github_created_at,
    ]);

    res.status(201).json({
      success: true,
      message: "GitHub profile analyzed and saved successfully",
      data: profileData,
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        success: false,
        message: "GitHub user not found",
      });
    }

    res.status(500).json({
  success: false,
  message: "Failed to analyze GitHub profile",
  error: error.message,
  githubError: error.response?.data || null,
  statusCode: error.response?.status || null,
});
  }
};
const getAllProfiles = async (req, res) => {
  try {
    const [profiles] = await pool.query(`
      SELECT 
        id,
        username,
        name,
        bio,
        location,
        public_repos,
        followers,
        following,
        profile_url,
        avatar_url,
        github_created_at,
        analyzed_at
      FROM github_profiles
      ORDER BY analyzed_at DESC
    `);

    res.status(200).json({
      success: true,
      message: "Profiles fetched successfully",
      count: profiles.length,
      data: profiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch profiles",
      error: error.message,
    });
  }
};
const getProfileByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const [profiles] = await pool.query(
      `
      SELECT 
        id,
        username,
        name,
        bio,
        location,
        public_repos,
        followers,
        following,
        profile_url,
        avatar_url,
        github_created_at,
        analyzed_at
      FROM github_profiles
      WHERE username = ?
      `,
      [username]
    );

    if (profiles.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Profile not found in database",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: profiles[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};
module.exports = {
  analyzeProfile,
  getAllProfiles,
  getProfileByUsername,
};