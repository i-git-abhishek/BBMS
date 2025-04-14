const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/", async (req, res) => {
  const { query } = req.body;

  try {
    const result = await pool.query(query);
    res.json({ rows: result.rows, fields: result.fields });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
