const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all donations
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM donors ORDER BY donor_id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST a new donation record
router.post('/', async (req, res) => {
  const { userID, Donatedat, quantity } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO donors (userID, Donatedat, quantity)
       VALUES ($1, $2, $3) RETURNING *`,
      [userID, Donatedat, quantity]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
