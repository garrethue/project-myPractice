const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/all", async (req, res) => {
  // GET route code here
  res.send("in get!");
  try {
    const allPractices = await pool.query("SELECT * FROM feedback ORDER BY id");
    res.json(allPractices.rows);
  } catch (err) {
    res.sendStatus(500);
    console.log(err.message);
  }
}); //End GET All Practices Route

/**
 * POST route template
 */
router.post("/add", async (req, res) => {
  try {
    //TODO: parameterize this in the future...
    let userId = 6; //this should be coming from req.user object

    // Simulate incoming practiceObj data from client
    // THIS WILL BE THE REQ.BODY
    let practice = {
      practice_name: "garret test",
      poses: [
        {
          pose_name: "triangle pose",
          time: 2,
        },
        {
          pose_name: "tree pose",
          time: 3,
        },
        {
          pose_name: "downward dog",
          time: 1,
        },
      ],
    };

    let { practice_name, poses } = practice;

    console.log(practice_name, poses);

    const newPractice = await pool.query(
      "INSERT INTO practices (practice_name, user_id) VALUES ($1,$2) RETURNING *", //RETURNING * is used whenever you are updating, inserting, deleting data
      [practice_name, userId]
    );

    //grab newPractice.rows.id to get the PRACTICE_ID

    const practiceId = newPractice.rows[0].id;
    //console.log(practiceId);

    //get pose_id
    //iterate over poses in array and add
    //for each pose in the pose array above,
    //select the poses ID from the poses table
    //INSERT INTO JUNCTION TABLE with pose_id, practice_id, and pose_time.

    //FOR EACH pose in the practice
    poses.map(async (poseObj) => {
      console.log(poseObj.pose_name, poseObj.time);
      //SELECT poseId from poses table for each pose in incoming pose array of client
      const result = await pool.query(
        "SELECT id FROM poses WHERE pose_name=$1",
        [poseObj.pose_name]
      );
      //console.log(result.rows[0].id);
      const poseId = result.rows[0].id;
      const poseTimeForGivenPractice = poseObj.time;
      //INSERT INTO practices_poses junction table using practiceId, poseId, and pose_time
      const newPracticePose = await pool.query(
        "INSERT INTO practices_poses (practice_id, pose_id, pose_time) VALUES ($1,$2,$3) RETURNING *",
        [practiceId, poseId, poseTimeForGivenPractice]
      );
      console.log(newPracticePose);
    });
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
    console.error(err.message);
  }
});

module.exports = router;
