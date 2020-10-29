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
import axios from "axios";
import TimeFormatter from "../HelperFunctions/TimeFormatter";
import GetTotalTime from "../HelperFunctions/GetTotalTime";

function EditPractice(props) {
  const [availableRows, setAvailableRows] = useState(10);
  const [availableTimes] = useState([30, 60, 120]);
  const [availablePoses] = useState(props.availablePoses);
  const [practiceName, setPracticeName] = useState(props.currentPracticeName);
  const [poses, setPoses] = useState(props.posesAndTimesInPractice);
  const [practiceId] = useState(props.practiceId);

  const handleSubmit = (e) => {
    e.preventDefault();
    const allPosesValid = poses.every(
      (poseObj) => poseObj.pose_name && poseObj.time
    );
    const practiceNameValid = practiceName ? true : false;

    console.log(poses.length);
    console.log(allPosesValid);
    console.log(practiceNameValid);

    if (practiceNameValid && poses.length > 0 && allPosesValid) {
      axios
        .put(`/api/practices/edit/${practiceId}`, {
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
    if (poses !== undefined) {
      return poses.map((poseObj, index) => {
        return (
          <Fragment key={index}>
            <Select
              value={poseObj.pose_name || ""}
              onChange={(e) => handleChangePoseName(index, e.target.value)}
              placeholder="Pose"
            >
              {availablePoses.map((poseString) => (
                <option value={poseString}>{poseString}</option>
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
    }
  };

  console.log("props", props);

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
            Edit This Practice
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
            Total Time: {TimeFormatter(GetTotalTime(props.practiceDetails))}
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
                <Button type="submit">Edit</Button>
              </Grid>
            </FormControl>
          </form>
          <Button onClick={addItem}>Add a Row</Button>
        </Box>
      </Grid>
    </div>
  );
}

const mapStoreToProps = (store) => {
  let { practiceDetails, poses, practices } = store;
  const posesAndTimesInPractice = practiceDetails.map((poseObj) => {
    return { pose_name: poseObj.pose_name, time: poseObj.pose_time };
  });
  const availablePoses = poses.map((poseObj) => poseObj.pose_name);
  const practiceId = practiceDetails[0].practice_id;
  const currentPracticeName = practices.filter(
    (practiceObj) => practiceObj.practice_id === practiceId
  )[0].practice_name;

  //do i need the rest of the store?
  console.log(currentPracticeName);
  return {
    ...store,
    posesAndTimesInPractice,
    practiceId,
    availablePoses,
    currentPracticeName,
  };
};

export default connect(mapStoreToProps)(withRouter(EditPractice));
