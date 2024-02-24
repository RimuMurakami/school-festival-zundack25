const express = require("express");
const mysql = require("mysql2/promise");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
    });

    const [rows] = await connection.execute(
      "SELECT target, count(*) as votes FROM attack25 WHERE payout = 0 GROUP BY target"
    );

    // const [rows] = await connection.execute("SELECT votes, team_color FROM quiz_votes");

    let voteResults = [0, 0, 0];
    rows.forEach((row) => {
      voteResults[row.target - 1] = row.votes;
    });

    connection.end();
    res.json(voteResults);
  } catch (error) {
    console.error("Error fetching votes from DB:", error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
