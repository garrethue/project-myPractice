const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/all", rejectUnauthenticated, async (req, res) => {
  const { id } = req.user;
  try {
    const allPracticesForGivenUser = await pool.query(
      'SELECT pr.id as practice_id, pr.practice_name FROM "user" u JOIN practices pr ON u.id=pr.user_id WHERE u.id=$1 ORDER BY practice_id',
      [id]
    );
    res.json(allPracticesForGivenUser.rows);
  } catch (err) {
    res.sendStatus(500);
    console.log(err.message);
  }
}); //End GET All Practices Route

// GET Details of a Practice Route
router.get("/details/:practice_id", rejectUnauthenticated, async (req, res) => {
  const { id } = req.user;
  const { practice_id } = req.params;
  try {
    const practiceDetails = await pool.query(
      'SELECT pr.id as practice_id, ps.pose_name, pp.pose_time FROM "user" u JOIN practices pr ON u.id=pr.user_id JOIN practices_poses pp ON pr.id=pp.practice_id JOIN poses ps ON pp.pose_id=ps.id WHERE u.id=$1 AND pr.id=$2 ORDER BY pp.id ASC',
      [id, practice_id]
    );
    res.json(practiceDetails.rows);
  } catch (err) {
    res.sendStatus(500);
    console.log(err.message);
  }
}); //End GET Details of a Practice Route

// POST a Practice Route
router.post("/add", rejectUnauthenticated, async (req, res) => {
  try {
    const { id } = req.user;
    const { practice_name, poses } = req.body;

    const newPractice = await pool.query(
      "INSERT INTO practices (practice_name, user_id) VALUES ($1,$2) RETURNING *", //RETURNING * is used whenever you are updating, inserting, deleting data
      [practice_name, id]
    );

    console.log(poses);

    //grab newPractice.rows.id to get the PRACTICE_ID
    const practiceId = newPractice.rows[0].id;

    //get pose_id
    //iterate over poses in array and add
    //for each pose in the pose array above,
    //select the poses ID from the poses table
    //INSERT INTO JUNCTION TABLE with pose_id, practice_id, and pose_time
    poses.map(async (poseObj) => {
      const result = await pool.query(
        "SELECT id FROM poses WHERE pose_name=$1",
        [poseObj.pose_name]
      );
      const poseId = result.rows[0].id;
      const poseTimeForGivenPractice = poseObj.time;
      const newPracticePose = await pool.query(
        "INSERT INTO practices_poses (practice_id, pose_id, pose_time) VALUES ($1,$2,$3) RETURNING *",
        [practiceId, poseId, poseTimeForGivenPractice]
      );
    });
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
    console.error(err.message);
  }
}); // End POST a Practice Route

// DELETE a Practice Route
router.delete(
  "/delete/:practice_id",
  rejectUnauthenticated,
  async (req, res) => {
    try {
      const { practice_id } = req.params;

      //note: must delete from junction table first due to foreign key constraints
      const deletePracticePoses = await pool.query(
        "DELETE FROM practices_poses WHERE practice_id=$1",
        [practice_id]
      );

      const deletePractice = await pool.query(
        "DELETE FROM practices WHERE id=$1",
        [practice_id]
      );

      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
      console.log(err.message);
    }
  }
); //END DELETE Practice Route

// EDIT a Practice Route
router.put("/edit/:practice_id", rejectUnauthenticated, async (req, res) => {
  try {
    const { practice_id } = req.params;
    const { practice_name, poses } = req.body;

    //UPDATE practice name
    const updatePracticeName = await pool.query(
      "UPDATE practices SET practice_name = $1 WHERE id = $2",
      [practice_name, practice_id]
    );

    //DELETE rows with practice id of to clear it out
    const deleteCurrentPracticePoses = await pool.query(
      "DELETE FROM practices_poses WHERE practice_id = $1",
      [practice_id]
    );
    // ... then INSERT the new data with the SAME practice_id
    poses.map(async (poseObj) => {
      const result = await pool.query(
        "SELECT id FROM poses WHERE pose_name=$1",
        [poseObj.pose_name]
      );
      const poseId = result.rows[0].id;
      const updatedPoseTimeForGivenPractice = poseObj.time;
      const updatedPracticePose = await pool.query(
        "INSERT INTO practices_poses (practice_id, pose_id, pose_time) VALUES ($1,$2,$3) RETURNING *",
        [practice_id, poseId, updatedPoseTimeForGivenPractice]
      );
    });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
    console.log(err.message);
  }
}); //END of EDIT a Practice Route

module.exports = router;
