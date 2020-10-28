import React, { useState, Fragment } from "react";
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

function CreatePractice(props) {
  const [availableRows, setAvailableRows] = useState(10); //while slots does NOT equal zero, add a slot
  const [availableTimes] = useState([30, 60, 120]);
  const [practiceName, setPracticeName] = useState("");
  const [poses, setPoses] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const allPosesValid = poses.every(
      (poseObj) => poseObj.pose_name && poseObj.time
    );
    const practiceNameValid = practiceName ? true : false;

    if (practiceNameValid && poses.length > 0 && allPosesValid) {
      axios
        .post("/api/practices/add", {
          practice_name: practiceName,
          poses: poses,
        })
        .then(() => {
          props.dispatch({ type: "FETCH_PRACTICES" });
          props.history.push("/all-practices");
        })
        .catch((err) => console.log(err));
    } else if (!practiceNameValid && poses.length === 0) {
      alert("Error: You can't fill out an empty form!");
    } else if (!allPosesValid && !practiceNameValid) {
      alert(
        "Error: Give your practice a name and make sure all poses have a name and a time! "
      );
    } else if (!allPosesValid) {
      alert("Error: make sure all poses have a name and a time!");
    } else if (!practiceNameValid) {
      alert("Error: give your practice a name!");
    } else {
      alert("Error: something unexpected occurred.");
    }
  };

  const handleChangePoseName = (i, value) => {
    let newPoses = [...poses]; //bring in the poses [...poses]
    newPoses[i].pose_name = value; //mutate whichever object in the array
    setPoses(newPoses); //reset the state with the newly mutated array
  };

  const handleChangePoseTime = (i, value) => {
    let newPoses = [...poses]; //bring in the poses [...poses]
    newPoses[i].time = value; //mutate whichever object in the array
    console.log(newPoses);
    setPoses(newPoses); //reset the state with the newly mutated array
  };

  const addItem = () => {
    // this.setState((prevState) => ({ values: [...prevState.values, ""] }));
    if (availableRows > 0) {
      setPoses([...poses, { pose_name: "", time: 0 }]);
      const newAvailableRows = availableRows - 1;
      setAvailableRows(newAvailableRows);
    } else {
      alert("Error: the max number of poses is 10!");
    }
  };

  const removeItem = (i) => {
    let newPoses = [...poses];
    newPoses.splice(i, 1);
    setPoses(newPoses);
    const newAvailableRows = availableRows + 1;
    setAvailableRows(newAvailableRows);
  };

  const createUI = () => {
    return poses.map((poseObj, index) => {
      return (
        <Fragment key={index}>
          <Select
            value={poseObj.pose_name || ""}
            onChange={(e) => handleChangePoseName(index, e.target.value)}
            placeholder="Pose"
          >
            {props.store.poses.map((poseObj) => (
              <option value={poseObj.pose_name}>{poseObj.pose_name}</option>
            ))}
          </Select>
          <Select
            value={poseObj.time || ""}
            onChange={(e) => handleChangePoseTime(index, e.target.value)}
            placeholder="Time"
          >
            {availableTimes.map((time) => (
              <option value={time}>{time} seconds</option>
            ))}
          </Select>
          <Button onClick={() => removeItem(index)}>Delete</Button>
        </Fragment>
      );
    });
    //     availableRows--;
    //   }
  };

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
            Create a Practice
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
                {createUI()}
                <Button type="submit">Create</Button>
              </Grid>
            </FormControl>
          </form>
          <Button onClick={addItem}>Add a Row</Button>
        </Box>
      </Grid>
    </div>
  );
}

export default connect(mapStoreToProps)(withRouter(CreatePractice));
