const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET all Poses Route
router.get("/all", rejectUnauthenticated, async (req, res) => {
  console.log("in poses!!");
  try {
    const allPoses = await pool.query("SELECT pose_name from poses");
    res.json(allPoses.rows);
  } catch (err) {
    res.sendStatus(500);
    console.log(err.message);
  }
}); //End GET All Poses Route

module.exports = router;
