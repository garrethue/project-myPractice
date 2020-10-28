import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Select,
  Button,
  Text,
  FormControl,
  Input,
} from "@chakra-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "../../redux/mapStoreToProps";
import axios from "axios";

function oldEditPractice(props) {
  const [practiceId] = useState(
    props.store.practiceDetails[0].practice_id || null
  );
  const [availableSlots] = useState(10); //while slots does NOT equal zero, add a slot
  const [availableTimes, setAvailableTimes] = useState([30, 60, 120]);
  const [practiceName, setPracticeName] = useState("");
  const [pose1, setPose1] = useState("");
  const [time1, setTime1] = useState("");
  const [pose2, setPose2] = useState("");
  const [time2, setTime2] = useState("");
  //wrap up each pose into an object? like im doing in the POST route?

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(pose1, time1);
    console.log(pose2, time2);
    console.log(practiceName);
    console.log(practiceId);

    axios
      .put(`/api/practices/edit/${practiceId}`, {
        practice_name: practiceName,
        poses: [
          {
            pose_name: pose1,
            time: time1,
          },
          { pose_name: pose2, time: time2 },
        ],
      })
      .then(() => {
        props.dispatch({ type: "FETCH_PRACTICES" });
        props.history.push("/all-practices");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    //not sure if i need this
    props.dispatch({ type: "FETCH_POSES" });
  }, []);

  return (
    <div>
      <Grid justifyContent="center">
        <Box textAlign="center" rounded={3} h="100%" w="100%" bg="yellow.500">
          <Text
            bg="black"
            textAlign="center"
            color="white"
            fontWeight="bold"
            fontSize="50px"
          >
            Edit this Practice
          </Text>
          <br />
          <Text
            marginRight={5}
            marginLeft={5}
            paddingRight={3}
            bg="black"
            textAlign="right"
            color="white"
            fontWeight="bold"
            fontSize="30px"
          >
            Total Time: x
          </Text>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <Input
                value={practiceName}
                onChange={(e) => setPracticeName(e.target.value)}
                type="text"
                placeholder="Your practice name here."
              />
              <Grid
                bg="transparent"
                margin={5}
                justifyContent="center"
                alignItems="center"
                templateColumns="repeat(3, 1fr)"
                gap={4}
              >
                {/* Need to Implement dynamic adding of rows!!*/}
                {/* row 1!!*/}
                <Select
                  value={pose1}
                  onChange={(e) => setPose1(e.target.value)}
                  placeholder="Pose"
                >
                  {props.store.poses.map((poseObj) => (
                    <option value={poseObj.pose_name}>
                      {poseObj.pose_name}
                    </option>
                  ))}
                </Select>
                <Select
                  value={time1}
                  onChange={(e) => setTime1(e.target.value)}
                  placeholder="Time"
                >
                  {availableTimes.map((time) => (
                    <option value={time}>{time} seconds</option>
                  ))}
                </Select>
                <Button>Delete</Button>

                <Select
                  value={pose2}
                  onChange={(e) => setPose2(e.target.value)}
                  placeholder="Pose"
                >
                  {props.store.poses.map((poseObj) => (
                    <option value={poseObj.pose_name}>
                      {poseObj.pose_name}
                    </option>
                  ))}
                </Select>
                <Select
                  value={time2}
                  onChange={(e) => setTime2(e.target.value)}
                  placeholder="Time"
                >
                  {availableTimes.map((time) => (
                    <option value={time}>{time} seconds</option>
                  ))}
                </Select>
                <Button>Delete</Button>

                <Button type="submit">Edit</Button>
              </Grid>
            </FormControl>
          </form>
        </Box>
      </Grid>
    </div>
  );
}

export default connect(mapStoreToProps)(withRouter(oldEditPractice));
