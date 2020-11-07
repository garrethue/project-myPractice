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
import mapStoreToProps from "../../redux/mapStoreToProps";
import axios from "axios";
import TimeFormatter from "../Helpers/TimeFormatter";
import GetTotalTime from "../Helpers/GetTotalTime";
import BackButton from "../Helpers/Buttons/BackButton";

function CreatePractice(props) {
  const [availableRows, setAvailableRows] = useState(30); //while slots does NOT equal zero, add a slot
  const [availableTimes] = useState([30, 60, 90, 120]);
  const [practiceName, setPracticeName] = useState("");
  const [poses, setPoses] = useState([]);
  const { colorMode } = useColorMode();
  const color = { light: "white", dark: "white" };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <IconButton
            isRound
            aria-label="Delete a Row"
            icon="delete"
            bg="black"
            size="lg"
            color={color[colorMode]}
            variantColor="red"
            onClick={() => removeItem(index)}
          />
        </Fragment>
      );
    });
  };

  return (
    <div>
      <Grid marginBottom={10} w="100%" justifyContent="center">
        <Box marginTop={5} marginBottom={5} w="50%">
          <BackButton viewTitle="All Practices" toWhere="all-practices" />
        </Box>
        <Box textAlign="center" rounded={3} h="100%" w="35em">
          <Text
            marginBottom={5}
            bg="header"
            paddingLeft={2}
            paddingRight={2}
            textAlign="center"
            color="white"
            fontSize="3rem"
          >
            Create a Practice
          </Text>
          <Text
            paddingRight={3}
            marginBottom={5}
            bg="black"
            textAlign="right"
            color="white"
            fontWeight="bold"
            fontSize="2rem"
          >
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
                  placeholder="Practice Name"
                />
                <Grid
                  bg="transparent"
                  marginTop={3}
                  marginBottom={3}
                  justifyContent="center"
                  alignItems="center"
                  templateColumns="6fr 6fr 1fr"
                  gap={4}
                >
                  {createUI()}
                  <Button
                    bg="black"
                    size="lg"
                    color={color[colorMode]}
                    variantColor="green"
                    type="submit"
                  >
                    Create Practice
                  </Button>
                </Grid>
              </FormControl>
            </form>
          )}
          <IconButton
            isRound
            aria-label="Add a Row"
            icon="add"
            bg="black"
            size="lg"
            boxShadow="lg"
            textShadow="lg"
            _hover={{ color: "black", bg: "white" }}
            color={color[colorMode]}
            variantColor="teal"
            onClick={addItem}
          />
        </Box>
      </Grid>
    </div>
  );
}

export default connect(mapStoreToProps)(withRouter(CreatePractice));
