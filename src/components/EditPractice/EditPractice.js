import React, { useState, Fragment } from "react";
import {
  Grid,
  Box,
  Select,
  Button,
  IconButton,
  Text,
  FormControl,
  Input,
  useColorMode,
} from "@chakra-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import TimeFormatter from "../Helpers/TimeFormatter";
import GetTotalTime from "../Helpers/GetTotalTime";
import BackButton from "../Helpers/Buttons/BackButton";

function EditPractice(props) {
  const [availableRows, setAvailableRows] = useState(
    30 - props.posesAndTimesInPractice.length
  );
  const [availableTimes] = useState([30, 60, 90, 120]);
  const [availablePoses] = useState(props.availablePoses);
  const [practiceName, setPracticeName] = useState(props.currentPracticeName);
  const [poses, setPoses] = useState(props.posesAndTimesInPractice);
  const [practiceId] = useState(props.practiceId);

  const { colorMode } = useColorMode();
  const color = { light: "white", dark: "white" };
  const bgColor = { light: "header", dark: "black" };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      alert("Error: you've reached the maximum number of poses!");
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
            <IconButton
              isRound
              aria-label="Delete a Row"
              icon="delete"
              bg={bgColor[colorMode]}
              size="lg"
              color={color[colorMode]}
              variantColor="red"
              onClick={() => removeItem(index)}
            />
          </Fragment>
        );
      });
    }
  };

  return (
    <div>
      <Grid marginBottom={10} justifyContent="center">
        <Box marginTop={5} marginBottom={5} w="50%">
          <BackButton viewTitle="Practice Details" toWhere="/details" />
        </Box>
        <Box textAlign="center" rounded={3} h="100%" w="35em">
          <Text
            rounded={3}
            bg={bgColor[colorMode]}
            textAlign="center"
            color="white"
            fontSize="3rem"
          >
            Edit This Practice
          </Text>
          <br />
          <Text
            rounded={3}
            paddingRight={3}
            bg={bgColor[colorMode]}
            textAlign="right"
            color="white"
            fontWeight="bold"
            fontSize="2rem"
            marginBottom={5}
          >
            {/* if availableRows is equal to 30, then there is no user-inputted data */}
            {availableRows < 30 &&
              `Total Time: ${TimeFormatter(GetTotalTime(poses, true))}`}
          </Text>
          {availableRows < 30 && (
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <Input
                  value={practiceName}
                  onChange={(e) => setPracticeName(e.target.value)}
                  type="text"
                  placeholder="Your practice name here."
                />
                <Grid
                  bg="transparent"
                  justifyContent="center"
                  alignItems="center"
                  templateColumns="6fr 6fr 1fr"
                  gap={4}
                  bg="transparent"
                  marginTop={3}
                  marginBottom={3}
                >
                  {createUI()}
                  <Button
                    bg={bgColor[colorMode]}
                    size="lg"
                    color={color[colorMode]}
                    variantColor="green"
                    type="submit"
                  >
                    Edit Practice
                  </Button>
                </Grid>
              </FormControl>
            </form>
          )}

          <IconButton
            isRound
            aria-label="Add a Row"
            icon="add"
            bg={bgColor[colorMode]}
            size="lg"
            boxShadow="lg"
            textShadow="lg"
            _hover={{ color: "black", bg: "white", transition: "0.5s" }}
            color={color[colorMode]}
            onClick={addItem}
          />
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
