const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM donations");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching donors:", err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  const { userid, hospitalid, quantity } = req.body;

  if (!userid || !hospitalid || !quantity) {
    return res.status(400).json({
      error: "Please provide userid, hospitalid, and quantity.",
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO donations (userid, hospitalid, quantity)
       VALUES ($1, $2, $3) RETURNING *`,
      [userid, hospitalid, quantity]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting donor record:", err.message);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
