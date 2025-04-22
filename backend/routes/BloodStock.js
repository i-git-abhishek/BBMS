const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/:bloodGroup", async (req, res) => {
    const { bloodGroup } = req.params;
  
    try {
      const result = await pool.query(
        `SELECT 
           h.hospitalID, h.name, h.address, h.city, h.state, h.zipcode, h.contact, h.email,
           bs.quantity
         FROM bloodStock bs
         JOIN hospitals h ON bs.hospitalID = h.hospitalID
         WHERE bs.bloodGroup = $1
         ORDER BY bs.quantity DESC`,
        [bloodGroup]
      );
  
      res.json({
        bloodGroup,
        totalQuantity: result.rows.reduce((acc, row) => acc + row.quantity, 0),
        hospitals: result.rows,
      });
    } catch (err) {
      console.error("Error fetching blood group info:", err.message);
      res.status(500).send("Server Error");
    }
  });
  
  

module.exports = router;
