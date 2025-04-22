const express = require("express");
const router = express.Router();
const pool = require("../db");


router.get("/", (req, res) => {
    res.send("Register route is working");
  });


router.post("/", async (req, res) => {
  try {
    const {
      name,
      dob,
      gender,
      bloodgroup,
      contact,
      email,
      password,
      address,
      city,
      state,
      zipcode,
      medical_conditions,
      eligible = true
    } = req.body;

    const query = `
      INSERT INTO users 
        (name, dob, gender, bloodgroup, contact, email, password, address, city, state, zipcode, medical_conditions, eligible)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *`;

    const values = [
      name,
      dob,
      gender,
      bloodgroup,
      contact,
      email,
      password,
      address,
      city,
      state,
      zipcode,
      medical_conditions,
      eligible
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error registering user:", err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
